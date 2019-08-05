/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FrontController } from '@app/core/presentation';
import { InstrumentCommandType } from '@app/core/presentation/commands';

import { LegalInstrument, RequestPaymentOrderData } from '@app/domain/models';


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


  onFileToRegistryAuthority() {
    this.fileToRegistryAuthority();
  }


  ngOnChanges() {
    this.resetForm();
  }


  // private members


  private getFormData() {
    const formModel = this.form.value;

    const data: RequestPaymentOrderData = {
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


  private fileToRegistryAuthority() {
    const payload = {
      instrument: this.instrument
    };

    this.frontController.dispatch(InstrumentCommandType.FILE_TO_REGISTRY_AUTHORITY, payload);
  }


  private resetForm() {
    this.form.reset({
      sendTo: this.instrument.transaction.sendTo || '',
      rfc: this.instrument.transaction.rfc || ''
    });
  }

}
