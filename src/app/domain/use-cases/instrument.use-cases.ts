/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Assertion } from '@app/core';

import { InstrumentApiProvider } from '../providers';

import {
  LegalInstrument, LegalInstrumentFilter, EmptyLegalInstrumentFilter,
  PreventiveNote, PreventiveNoteEditionData,
} from '@app/domain/models';


@Injectable()
export class InstrumentUseCases {

  private instrumentsList: BehaviorSubject<LegalInstrument[]> = new BehaviorSubject([]);

  private filter = EmptyLegalInstrumentFilter;


  constructor(private backend: InstrumentApiProvider) { }


  getInstruments(): Observable<LegalInstrument[]> {
    return this.instrumentsList.asObservable();
  }


  setFilter(filter: LegalInstrumentFilter) {
    Assertion.assertValue(filter, 'filter');

    this.filter = filter;
    this.loadInstruments();
  }


  // update methods


  createPreventiveNote(data: PreventiveNoteEditionData): Observable<PreventiveNote> {
    Assertion.assertValue(data, 'data');

    return this.backend.createPreventiveNote(data)
      .pipe(
        tap(() => this.loadInstruments())
      );
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

    return this.backend.updatePreventiveNote(preventiveNote, data)
      .pipe(
        tap(x => Object.assign(preventiveNote, x))
      );
  }


  requestPaymentOrder(instrument: LegalInstrument, data: any): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');

    return this.backend.requestPaymentOrder(instrument, data);
  }


  requestRecording(instrument: LegalInstrument, data: any) {
    Assertion.assertValue(instrument, 'instrument');

    return this.backend.requestRecording(instrument, data);
  }


  // private methods


  private loadInstruments() {
    this.backend.getInstruments(this.filter.status, this.filter.keywords)
      .subscribe(
        data => this.instrumentsList.next(data)
      );
  }

}
