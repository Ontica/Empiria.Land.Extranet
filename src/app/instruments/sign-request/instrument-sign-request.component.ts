/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { InstrumentStore } from '@app/store';

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

  constructor(private store: InstrumentStore) { }

  ngOnChanges() {
    this.revokeMode = false;
  }


  onSignTokenReceived(token: string) {
    if (this.revokeMode) {
      this.revokeSign('revocationToken');
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
    this.store.revokeInstrumentSign(this.instrument, revocationToken)
      .toPromise()
      .then(() => {
        this.instrumentChange.emit(this.instrument);
      });
  }


  private sign(signToken: string) {
    this.store.signInstrument(this.instrument, signToken)
        .toPromise()
        .then(() => {
          this.instrumentChange.emit(this.instrument);
        });
  }

}
