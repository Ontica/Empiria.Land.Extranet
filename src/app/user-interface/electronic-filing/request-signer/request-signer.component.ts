/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { EventInfo } from '@app/core';
import { ElectronicFilingCommandType } from '@app/core/presentation/commands';

import { EFilingRequest } from '@app/domain/models';


@Component({
  selector: 'emp-one-request-signer',
  templateUrl: './request-signer.component.html'
})
export class RequestSignerComponent implements OnChanges {

  @Input() request: EFilingRequest;

  @Input() readonly = false;

  @Output() editionEvent = new EventEmitter<EventInfo>();

  revokeMode = false;


  ngOnChanges() {
    this.revokeMode = false;
  }


  get isSigned() {
    return this.request.esign && this.request.esign.sign;
  }


  onSignTokenReceived(token: string) {
    if (this.revokeMode) {
      this.revokeSign(token);
      this.revokeMode = false;
    } else {
      this.sign(token);
    }
  }


  toggleRevokeMode() {
    this.revokeMode = !this.revokeMode;
  }


  // private members


  private revokeSign(revocationToken: string) {
    const event: EventInfo = {
      type: ElectronicFilingCommandType.REVOKE_SIGN,
      payload: {
        request: this.request,
        token: revocationToken
      }
    };

    this.editionEvent.emit(event);
  }


  private sign(signToken: string) {
    const event: EventInfo = {
      type: ElectronicFilingCommandType.SIGN,
      payload: {
        request: this.request,
        token: signToken
      }
    };

    this.editionEvent.emit(event);
  }

}
