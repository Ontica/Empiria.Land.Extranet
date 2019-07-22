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

import { InstrumentDataProvider } from '../providers';

import {
  LegalInstrument, LegalInstrumentFilter, EmptyLegalInstrumentFilter,
  PreventiveNote, PreventiveNoteRequest,
} from '@app/models/registration';


@Injectable()
export class InstrumentData {

  private instrumentsList: BehaviorSubject<LegalInstrument[]> = new BehaviorSubject([]);

  private filter = EmptyLegalInstrumentFilter;


  constructor(private dataProvider: InstrumentDataProvider) { }


  getInstruments(): Observable<LegalInstrument[]> {
    return this.instrumentsList.asObservable();
  }


  setFilter(filter: LegalInstrumentFilter) {
    Assertion.assertValue(filter, 'filter');

    this.filter = filter;
    this.loadInstruments();
  }


  // update methods


  createPreventiveNote(data: PreventiveNoteRequest): Observable<PreventiveNote> {
    Assertion.assertValue(data, 'data');

    return this.dataProvider.createPreventiveNote(data)
      .pipe(
        tap(() => this.loadInstruments())
      );
  }


  revokeInstrumentSign(instrument: LegalInstrument,
                       revocationToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(revocationToken, 'revocationToken');

    return this.dataProvider.revokeInstrumentSign(instrument, revocationToken);
  }


  signInstrument(instrument: LegalInstrument,
                 signToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(signToken, 'signToken');

    return this.dataProvider.signInstrument(instrument, signToken);
  }


  updatePreventiveNote(preventiveNote: PreventiveNote,
                       data: PreventiveNoteRequest): Observable<PreventiveNote> {
    Assertion.assertValue(preventiveNote, 'preventiveNote');
    Assertion.assertValue(data, 'data');

    return this.dataProvider.updatePreventiveNote(preventiveNote, data)
      .pipe(
        tap(x => Object.assign(preventiveNote, x))
      );
  }


  requestPaymentOrder(instrument: LegalInstrument, data: any): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');

    return this.dataProvider.requestPaymentOrder(instrument, data);
  }


  requestRecording(instrument: LegalInstrument, data: any) {
    Assertion.assertValue(instrument, 'instrument');

    return this.dataProvider.requestRecording(instrument, data);
  }


  // private methods


  private loadInstruments() {
    this.dataProvider.getInstruments(this.filter.status, this.filter.keywords)
      .subscribe(
        data => this.instrumentsList.next(data)
      );
  }

}
