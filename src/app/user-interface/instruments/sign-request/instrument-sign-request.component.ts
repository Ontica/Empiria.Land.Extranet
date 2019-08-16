/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { EventInfo } from '@app/core';
import { InstrumentCommandType } from '@app/core/presentation/commands';

import { LegalInstrument } from '@app/domain/models';


@Component({
  selector: 'emp-land-instrument-sign-request',
  templateUrl: './instrument-sign-request.component.html'
})
export class InstrumentSignRequestComponent implements OnChanges {

  @Input() instrument: LegalInstrument;

  @Input() readonly = false;

  @Output() editionEvent = new EventEmitter<EventInfo>();

  revokeMode = false;


  ngOnChanges() {
    this.revokeMode = false;
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
      type: InstrumentCommandType.REVOKE_SIGN,
      payload: {
        instrument: this.instrument,
        token: revocationToken
      }
    };

    this.editionEvent.emit(event);
  }


  private sign(signToken: string) {
    const event: EventInfo = {
      type: InstrumentCommandType.SIGN,
      payload: {
        instrument: this.instrument,
        token: signToken
      }
    };

    this.editionEvent.emit(event);
  }

}
