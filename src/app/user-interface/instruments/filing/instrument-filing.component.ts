/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { LegalInstrument } from '@app/domain/models';
import { FrontController } from '@app/core/presentation';
import { InstrumentCommandType } from '@app/core/presentation/commands';


@Component({
  selector: 'emp-land-instrument-filing',
  templateUrl: './instrument-filing.component.html'
})
export class InstrumentFilingComponent implements OnChanges {

  @Input() instrument: LegalInstrument;

  form = new FormGroup({
    sendTo: new FormControl('', Validators.email),
    rfc: new FormControl(''),
  });

  constructor(private frontController: FrontController) { }


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
    const payload = {
      instrument: this.instrument,
      data: this.getFormData()
    };

    this.frontController.dispatch(InstrumentCommandType.REQUEST_PAYMENT_ORDER, payload);
  }


  private requestRecording() {
    const payload = {
      instrument: this.instrument
    };

    this.frontController.dispatch(InstrumentCommandType.FILE_TO_RECORDING_AUTHORITY, payload);
  }


  private resetForm() {
    this.form.reset({
      sendTo: this.instrument.transaction.sendTo || '',
      rfc: this.instrument.transaction.rfc || ''
    });
  }

}
