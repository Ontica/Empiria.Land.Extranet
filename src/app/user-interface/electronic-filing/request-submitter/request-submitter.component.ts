/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { EventInfo, SessionService } from '@app/core';

import { ElectronicFilingCommandType } from '@app/core/presentation/commands';

import { EFilingRequest } from '@app/domain/models';



@Component({
  selector: 'emp-one-request-submitter',
  templateUrl: './request-submitter.component.html'
})
export class RequestSubmitterComponent implements OnChanges {

  @Input() request: EFilingRequest;

  @Output() editionEvent = new EventEmitter<EventInfo>();

  paymentOrderUrl = '';

  constructor(private session: SessionService) { }


  ngOnChanges() {
    this.buildPaymentOrderUrl();
  }


  get hasRouteNumber() {
    return this.request.paymentOrder && this.request.paymentOrder.routeNumber;
  }


  get readyForSubmission() {
    return this.hasRouteNumber && this.request.paymentOrder.receiptNo && !this.submitted;
  }


  get submitted() {
    return this.request.transaction && this.request.transaction.presentationDate;
  }


  onGeneratePaymentOrder() {
    this.generatePaymentOrder();
  }


  onSavePaymentReceipt() {
    this.submitPaymentReceipt();
  }


  onSubmitRequest() {
    this.submitRequest();
  }


  // private members


  private buildPaymentOrderUrl() {
    if (!this.request.paymentOrder) {
      this.paymentOrderUrl = '';
      return;
    }

    this.session.getSettings().then(
      settings => {
        const baseAddress = settings.get<string>('PAYMENT_ORDERS_HTTP_BASE_ADDRESS');
        this.paymentOrderUrl = `${baseAddress}${this.request.paymentOrder.urlPath}`;
      });
  }


  private generatePaymentOrder() {
    const event: EventInfo = {
      type: ElectronicFilingCommandType.GENERATE_PAYMENT_ORDER,
      payload: {
        request: this.request
      }
    };

    this.editionEvent.emit(event);
  }


  private submitPaymentReceipt() {
    const event: EventInfo = {
      type: ElectronicFilingCommandType.SET_PAYMENT_RECEIPT,
      payload: {
        request: this.request,
        receiptNo: this.request.paymentOrder.receiptNo
      }
    };

    this.editionEvent.emit(event);
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
