/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, HttpService } from '@app/core';

import { RealEstate, PreventiveNote, LegalInstrument } from '@app/models/registration';


@Injectable()
export class InstrumentService {

  constructor(private http: HttpService) { }


  getInstrument(uid: string): Observable<LegalInstrument> {
    Assertion.assertValue(uid, 'uid');

    const path = `v2/extranet/instruments/${uid}`;

    return this.http.get<LegalInstrument>(path);
  }


  getInstruments(): Observable<LegalInstrument[]> {
    const path = `v2/extranet/instruments`;

    return this.http.get<LegalInstrument[]>(path);
  }


  createPreventiveNote(data: { requestedBy: string; propertyUID: string; projectedOperation: string; }): Observable<PreventiveNote> {
    Assertion.assertValue(data, 'data');

    const path = `v2/extranet/instruments/create-preventive-note`;

    return this.http.post<PreventiveNote>(path, data);
  }


  updatePreventiveNote(preventiveNote: PreventiveNote,
                       data: { requestedBy: string, propertyUID: string; projectedOperation: string; }): Observable<PreventiveNote> {
    Assertion.assertValue(preventiveNote, 'preventiveNote');
    Assertion.assertValue(data, 'data');

    const path = `v2/extranet/instruments/${preventiveNote.uid}`;

    return this.http.put<PreventiveNote>(path, data);
  }

}
