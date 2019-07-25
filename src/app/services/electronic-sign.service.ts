/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion } from '@app/core';

import { InstrumentMethods } from '@app/domain';

import { LegalInstrument } from '@app/models/registration';


@Injectable()
export class ElectronicSignService {

  constructor(private domain: InstrumentMethods) { }


  signInstrument(instrument: LegalInstrument,
                 signToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(signToken, 'signToken');

    return this.domain.signInstrument(instrument, signToken);
  }


  revokeInstrumentSign(instrument: LegalInstrument,
                       revocationToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(revocationToken, 'revocationToken');

    return this.domain.revokeInstrumentSign(instrument, revocationToken);

  }

}
