/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EventInfo } from '@app/core';

import { InstrumentCommandType } from '@app/core/presentation/commands';

import { LegalInstrument, RequestPaymentOrderData } from '@app/domain/models';


@Component({
  selector: 'emp-land-instrument-filing',
  templateUrl: './instrument-filing.component.html'
})
export class InstrumentFilingComponent implements OnChanges {

  @Input() instrument: LegalInstrument;

  @Output() editionEvent = new EventEmitter<EventInfo>();


  form = new FormGroup({
    sendTo: new FormControl('', Validators.email),
    rfc: new FormControl(''),
  });


  ngOnChanges() {
    this.resetForm();
  }


  onRequestPaymentOrder() {
    this.requestPaymentOrder();
  }


  onFileToRegistryAuthority() {
    this.fileToRegistryAuthority();
  }


  // private members


  private fileToRegistryAuthority() {
    const event: EventInfo = {
      type: InstrumentCommandType.FILE_TO_REGISTRY_AUTHORITY,
      payload: {
        instrument: this.instrument
      }
    };

    this.editionEvent.emit(event);
  }


  private getFormData() {
    const formModel = this.form.value;

    const data: RequestPaymentOrderData = {
      rfc: (formModel.rfc as string).toUpperCase(),
      sendTo: (formModel.sendTo as string).toLowerCase()
    };

    return data;
  }


  private requestPaymentOrder() {
    const event: EventInfo = {
      type: InstrumentCommandType.REQUEST_PAYMENT_ORDER,
      payload: {
        instrument: this.instrument,
        data: this.getFormData()
      }
    };

    this.editionEvent.emit(event);
  }


  private resetForm() {
    this.form.reset({
      sendTo: this.instrument.transaction.sendTo || '',
      rfc: this.instrument.transaction.rfc || ''
    });
  }

}
