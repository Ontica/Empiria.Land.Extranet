/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { FrontController } from '@app/core/presentation';

import { LegalInstrument } from '@app/models/registration';


@Component({
  selector: 'emp-land-instrument-sign-request',
  templateUrl: './instrument-sign-request.component.html',
  styleUrls: [
    '../../../styles/general-styles.scss',
    '../../../styles/form.scss'
  ]
})
export class InstrumentSignRequestComponent implements OnChanges {

  @Input() instrument: LegalInstrument;

  @Output() instrumentChange = new EventEmitter<LegalInstrument>();

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

    const action = this.frontController.createAction('LAND.LEGAL.INSTRUMENT.SIGN.REVOKED', payload);

    this.frontController.dispatch(action)
      .then(x => {
        this.instrument = x;
        this.instrumentChange.emit(this.instrument);
      });
  }


  private sign(signToken: string) {
    const payload = {
      instrument: this.instrument,
      token: signToken
    };

    const action = this.frontController.createAction('LAND.LEGAL.INSTRUMENT.SIGNED', payload);

    this.frontController.dispatch(action)
      .then((x: LegalInstrument) => {
        this.instrument = x;
        this.instrumentChange.emit(this.instrument);
      });
  }

}
