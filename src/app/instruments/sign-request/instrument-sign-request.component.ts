/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { InstrumentService } from '@app/services/instrument.service';

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

  constructor(private service: InstrumentService) { }

  ngOnChanges() {
    this.revokeMode = false;
  }


  onSignTokenReceived(token: string) {
    if (this.revokeMode) {
      this.revokeSign('revocationToken');
      this.revokeMode = false;
    } else {
      this.doSignRequest(token);
    }
  }


  toggleRevokeMode() {
    this.revokeMode = !this.revokeMode;
  }


  // private members


  private doSignRequest(signToken: string) {
    this.service.signInstrument(this.instrument, signToken)
        .toPromise()
        .then(x => {
          this.instrument = x;
          this.instrumentChange.emit(this.instrument);
        });
  }


  private revokeSign(revocationToken: string) {
    this.service.revokeInstrumentSign(this.instrument, revocationToken)
        .toPromise()
        .then(x => {
          this.instrument = x;
          this.instrumentChange.emit(this.instrument);
        });
  }

}
