/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { InstrumentService, PropertyService } from '@app/services';

import { LegalInstrument, PreventiveNote, PreventiveNoteRequest, RealEstate } from '@app/models/registration';
import { Assertion } from '@app/core';


@Injectable()
export class InstrumentStore {

  private inProcessInstruments: BehaviorSubject<LegalInstrument[]> = new BehaviorSubject([]);


  constructor(private service: InstrumentService,
              private propertyService: PropertyService) {
    this.loadInitialData();
  }


  getInstruments(): Observable<LegalInstrument[]> {
    return this.inProcessInstruments.asObservable();
  }


  getRealEstate(propertyUID: string): Promise<RealEstate> {
    Assertion.assertValue(propertyUID, 'propertyUID');

    return this.propertyService.getRealEstate(propertyUID)
               .toPromise();
  }


  // update methods


  createPreventiveNote(data: PreventiveNoteRequest): Promise<PreventiveNote> {
    Assertion.assertValue(data, 'data');

    return this.service.createPreventiveNote(data)
               .toPromise()
               .then(x => {
                  this.loadInProcessInstruments();
                  return x;
              });
  }


  revokeInstrumentSign(instrument: LegalInstrument,
                       revocationToken: string): Promise<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(revocationToken, 'revocationToken');

    return this.service.revokeInstrumentSign(instrument, revocationToken)
      .toPromise()
      .then(x => {
        Object.assign(instrument, x);

        return x;
    });
  }


  signInstrument(instrument: LegalInstrument,
                 signToken: string): Promise<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(signToken, 'signToken');

    return this.service.signInstrument(instrument, signToken)
      .toPromise()
      .then(x => {
        Object.assign(instrument, x);

        return x;
    });
  }


  updatePreventiveNote(preventiveNote: PreventiveNote,
                       data: PreventiveNoteRequest): Promise<PreventiveNote> {
    Assertion.assertValue(preventiveNote, 'preventiveNote');
    Assertion.assertValue(data, 'data');

    return this.service.updatePreventiveNote(preventiveNote, data)
               .toPromise()
               .then(x => {
                  Object.assign(preventiveNote, x);

                  return x;
               });
  }


  // private methods


  private loadInitialData() {
    this.loadInProcessInstruments();
  }


  private loadInProcessInstruments() {
    this.service.getInstruments()
        .subscribe(
            data => {
              this.inProcessInstruments.next(data);
            },
            err => console.log('Error reading in-process instruments data.', err)
        );
  }

}
