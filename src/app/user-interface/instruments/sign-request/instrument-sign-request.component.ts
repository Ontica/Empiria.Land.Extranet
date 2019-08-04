/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges } from '@angular/core';

import { FrontController } from '@app/core/presentation';
import { InstrumentCommandType } from '@app/core/presentation/commands';

import { LegalInstrument } from '@app/domain/models';


@Component({
  selector: 'emp-land-instrument-sign-request',
  templateUrl: './instrument-sign-request.component.html'
})
export class InstrumentSignRequestComponent implements OnChanges {

  @Input() instrument: LegalInstrument;

  revokeMode = false;

  constructor(private frontController: FrontController) { }

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
    const payload = {
      instrument: this.instrument,
      token: revocationToken
    };

    this.frontController.dispatch(InstrumentCommandType.REVOKE_SIGN, payload);
  }


  private sign(signToken: string) {
    const payload = {
      instrument: this.instrument,
      token: signToken
    };

    this.frontController.dispatch(InstrumentCommandType.SIGN, payload);
  }

}
