/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EventInfo } from '@app/core';
import { FrontController } from '@app/core/presentation';

import { EFilingRequest, EmptyEFilingRequest, Requester } from '@app/domain/models';
import { ElectronicFilingCommandType } from '@app/core/presentation/commands';


@Component({
  selector: 'emp-one-request-tabbed-view',
  templateUrl: './request-tabbed-view.component.html'
})
export class RequestTabbedViewComponent {

  @Input() request: EFilingRequest = EmptyEFilingRequest;

  @Output() closeEvent = new EventEmitter<void>();


  constructor(private frontController: FrontController) { }


  get signed() {
    return (this.request.esign && this.request.esign.sign);
  }

  get isSigner() {
    return (false);
  }


  get submitted() {
    return (this.request.transaction && this.request.transaction.presentationDate);
  }


  onClose() {
    this.closeEvent.emit();
  }


  onRequesterDataChanged(requester: Requester) {
    this.sendCreateEFilingRequestEvent(requester);
  }


  processEvent(event: EventInfo) {
    this.frontController.dispatch<void>(event)
        .catch(err => alert(err.error.response.data.errorMessage ||
                            'Ocurrió un problema: \n\n' + JSON.stringify(err))
        );
  }


  private sendCreateEFilingRequestEvent(requestedBy: Requester) {
    const event: EventInfo = {
      type: ElectronicFilingCommandType.UPDATE_EFILING_REQUEST,
      payload: {
        request: this.request,
        requestedBy
      }
    };

    this.processEvent(event);
  }

}
