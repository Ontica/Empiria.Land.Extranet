/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion } from '@app/core';

import { InstrumentApiProvider } from '../providers';

import {
  LegalInstrument, LegalInstrumentFilter,
  PreventiveNote, PreventiveNoteEditionData
} from '@app/domain/models';


@Injectable()
export class InstrumentUseCases {

  constructor(private backend: InstrumentApiProvider) { }


  getInstruments(filter: LegalInstrumentFilter): Observable<LegalInstrument[]> {
    Assertion.assertValue(filter, 'filter');

    return this.backend.getInstruments(filter.status, filter.keywords);
  }


  // update methods


  createPreventiveNote(data: PreventiveNoteEditionData): Observable<PreventiveNote> {
    Assertion.assertValue(data, 'data');

    return this.backend.createPreventiveNote(data);
  }


  revokeInstrumentSign(instrument: LegalInstrument,
                       revocationToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(revocationToken, 'revocationToken');

    return this.backend.revokeInstrumentSign(instrument, revocationToken);
  }


  signInstrument(instrument: LegalInstrument,
                 signToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(signToken, 'signToken');

    return this.backend.signInstrument(instrument, signToken);
  }


  updatePreventiveNote(preventiveNote: PreventiveNote,
                       data: PreventiveNoteEditionData): Observable<PreventiveNote> {
    Assertion.assertValue(preventiveNote, 'preventiveNote');
    Assertion.assertValue(data, 'data');

    return this.backend.updatePreventiveNote(preventiveNote, data);
  }


  requestPaymentOrder(instrument: LegalInstrument, data: any): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');

    return this.backend.requestPaymentOrder(instrument, data);
  }


  requestRecording(instrument: LegalInstrument, data: any) {
    Assertion.assertValue(instrument, 'instrument');

    return this.backend.requestRecording(instrument, data);
  }

}
