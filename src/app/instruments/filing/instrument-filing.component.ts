/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';

import { InstrumentService } from '@app/services/instrument.service';

import { LegalInstrument } from '@app/models/registration';


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
    sendTo: new FormControl(''),
    rfc: new FormControl(''),
  });

  constructor(private service: InstrumentService) { }


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
      rfc: formModel.rfc,
      sendTo: formModel.sendTo
    };

    return data;
  }


  private requestPaymentOrder() {
    const data = this.getFormData();

    this.service.requestPaymentOrder(this.instrument, data)
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

    // if (this.readonly) {
    //   this.form.disable();
    // } else {
    //   this.form.enable();
    // }
  }


  private requestRecording() {
    this.service.requestRecording(this.instrument, {})
        .toPromise()
        .then(x => {
          this.instrument = x;
          this.instrumentChange.emit(this.instrument);
        });
  }

}
