/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion } from '@app/core';

import { InstrumentData } from '@app/data';

import { LegalInstrument } from '@app/models/registration';


@Injectable()
export class ElectronicSignService {

  constructor(private data: InstrumentData) { }


  signInstrument(instrument: LegalInstrument,
                 signToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(signToken, 'signToken');

    return this.data.signInstrument(instrument, signToken);
  }


  revokeInstrumentSign(instrument: LegalInstrument,
                       revocationToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(revocationToken, 'revocationToken');

    return this.data.revokeInstrumentSign(instrument, revocationToken);

  }

}
