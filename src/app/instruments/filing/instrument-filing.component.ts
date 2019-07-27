/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InstrumentUseCases } from '@app/domain/use-cases';

import { LegalInstrument } from '@app/domain/models';


@Component({
  selector: 'emp-land-instrument-filing',
  templateUrl: './instrument-filing.component.html',
  styleUrls: [
    '../../../styles/general-styles.scss',
    '../../../styles/form.scss'
  ]
})
export class InstrumentFilingComponent implements OnChanges {

  @Input() instrument: LegalInstrument;

  @Output() instrumentChange = new EventEmitter<LegalInstrument>();

  form = new FormGroup({
    sendTo: new FormControl('', Validators.email),
    rfc: new FormControl(''),
  });

  constructor(private domain: InstrumentUseCases) { }


  onRequestPaymentOrder() {
    this.requestPaymentOrder();
  }


  onRequestRecording() {
    this.requestRecording();
  }


  ngOnChanges() {
    this.resetForm();
  }


  // private members


  private getFormData() {
    const formModel = this.form.value;

    const data = {
      rfc: (formModel.rfc as string).toUpperCase(),
      sendTo: (formModel.sendTo as string).toLowerCase()
    };

    return data;
  }


  private requestPaymentOrder() {
    const data = this.getFormData();

    this.domain.requestPaymentOrder(this.instrument, data)
        .toPromise()
        .then(x => {
          this.instrument = x;
          this.instrumentChange.emit(this.instrument);
        });
  }


  private resetForm() {
    this.form.reset({
      sendTo: this.instrument.transaction.sendTo || '',
      rfc: this.instrument.transaction.rfc || ''
    });
  }


  private requestRecording() {
    this.domain.requestRecording(this.instrument, {})
        .toPromise()
        .then(x => {
          this.instrument = x;
          this.instrumentChange.emit(this.instrument);
        });
  }

}
