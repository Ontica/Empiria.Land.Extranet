/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Assertion } from '@app/core';

import { InstrumentService, PropertyService } from '@app/services';

import {
  LegalInstrument, LegalInstrumentFilter, EmptyLegalInstrumentFilter,
  PreventiveNote, PreventiveNoteRequest, RealEstate,
} from '@app/models/registration';


@Injectable()
export class InstrumentStore {

  private instrumentsList: BehaviorSubject<LegalInstrument[]> = new BehaviorSubject([]);

  private filter = EmptyLegalInstrumentFilter;


  constructor(private service: InstrumentService,
              private propertyService: PropertyService) { }


  getInstruments(): Observable<LegalInstrument[]> {
    return this.instrumentsList.asObservable();
  }


  getRealEstate(propertyUID: string): Observable<RealEstate> {
    Assertion.assertValue(propertyUID, 'propertyUID');

    return this.propertyService.getRealEstate(propertyUID);
  }


  setFilter(filter: LegalInstrumentFilter) {
    Assertion.assertValue(filter, 'filter');

    this.filter = filter;
    this.loadInstruments();
  }


  // update methods


  createPreventiveNote(data: PreventiveNoteRequest): Observable<PreventiveNote> {
    Assertion.assertValue(data, 'data');

    return this.service.createPreventiveNote(data)
      .pipe(
        tap(() => this.loadInstruments())
      );
  }


  revokeInstrumentSign(instrument: LegalInstrument,
                       revocationToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(revocationToken, 'revocationToken');

    return this.service.revokeInstrumentSign(instrument, revocationToken)
      .pipe(
        tap(x => Object.assign(instrument, x))
      );
  }


  signInstrument(instrument: LegalInstrument,
                 signToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(signToken, 'signToken');

    return this.service.signInstrument(instrument, signToken)
      .pipe(
        tap(x => Object.assign(instrument, x))
      );
  }


  updatePreventiveNote(preventiveNote: PreventiveNote,
                       data: PreventiveNoteRequest): Observable<PreventiveNote> {
    Assertion.assertValue(preventiveNote, 'preventiveNote');
    Assertion.assertValue(data, 'data');

    return this.service.updatePreventiveNote(preventiveNote, data)
      .pipe(
        tap(x => Object.assign(preventiveNote, x))
      );
  }


  // private methods


  private loadInstruments() {
    this.service.getInstruments(this.filter.status, this.filter.keywords)
      .subscribe(
        data => {
          this.instrumentsList.next(data);
        },
        err => console.log('Error reading instruments data.', err)
      );
  }

}
