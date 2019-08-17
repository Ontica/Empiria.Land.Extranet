/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EventInfo } from '@app/core';

import { ElectronicFilingCommandType } from '@app/core/presentation/commands';

import { Request, RequestPaymentOrderData } from '@app/domain/models';


@Component({
  selector: 'emp-one-request-submitter',
  templateUrl: './request-submitter.component.html'
})
export class RequestSubmitterComponent implements OnChanges {

  @Input() request: Request;

  @Output() editionEvent = new EventEmitter<EventInfo>();


  form = new FormGroup({
    sendTo: new FormControl('', Validators.email),
    rfc: new FormControl(''),
  });


  ngOnChanges() {
    this.resetForm();
  }


  onGeneratePaymentOrder() {
    this.generatePaymentOrder();
  }


  onSubmitRequest() {
    this.submitRequest();
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


  private generatePaymentOrder() {
    const event: EventInfo = {
      type: ElectronicFilingCommandType.GENERATE_PAYMENT_ORDER,
      payload: {
        request: this.request,
        data: this.getFormData()
      }
    };

    this.editionEvent.emit(event);
  }


  private resetForm() {
    this.form.reset({
      sendTo: this.request.transaction.sendTo || '',
      rfc: this.request.transaction.rfc || ''
    });
  }


  private submitRequest() {
    const event: EventInfo = {
      type: ElectronicFilingCommandType.REQUEST_SUBMISSION,
      payload: {
        request: this.request
      }
    };

    this.editionEvent.emit(event);
  }

}
