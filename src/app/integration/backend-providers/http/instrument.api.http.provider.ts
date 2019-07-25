/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, HttpService } from '@app/core';

import { InstrumentApiProvider } from '@app/domain/providers';

import { LegalInstrument, LegalInstrumentStatus,
         PreventiveNote, PreventiveNoteRequest } from '@app/models/registration';


@Injectable()
export class InstrumentApiHttpProvider extends InstrumentApiProvider {

  constructor(private http: HttpService) {
    super();
  }


  getInstrument(uid: string): Observable<LegalInstrument> {
    Assertion.assertValue(uid, 'uid');

    const path = `v2/extranet/instruments/${uid}`;

    return this.http.get<LegalInstrument>(path);
  }


  getInstruments(status?: LegalInstrumentStatus,
                 keywords?: string): Observable<LegalInstrument[]> {
    let path = `v2/extranet/instruments`;

    if (status && keywords) {
      path += `/?status=${status}&keywords=${keywords}`;
    } else if (status && !keywords) {
      path += `/?status=${status}`;
    } else if (!status && keywords) {
      path += `/?keywords=${keywords}`;
    } else {
      // no-op
    }

    return this.http.get<LegalInstrument[]>(path);
  }


  createPreventiveNote(data: PreventiveNoteRequest): Observable<PreventiveNote> {
    Assertion.assertValue(data, 'data');

    const path = `v2/extranet/instruments/create-preventive-note`;

    return this.http.post<PreventiveNote>(path, data);
  }


  requestPaymentOrder(instrument: LegalInstrument, data: any): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');

    const path = `v2/extranet/instruments/${instrument.uid}/request-payment-order`;

    return this.http.post<LegalInstrument>(path, data);
  }


  requestRecording(instrument: LegalInstrument, data: any) {
    Assertion.assertValue(instrument, 'instrument');

    const path = `v2/extranet/instruments/${instrument.uid}/request-recording`;

    return this.http.post<LegalInstrument>(path, data);
  }


  revokeInstrumentSign(instrument: LegalInstrument,
                       revokeSignToken: string) {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(revokeSignToken, 'revokeSignToken');

    const path = `v2/extranet/instruments/${instrument.uid}/revoke-sign`;

    return this.http.post<LegalInstrument>(path, { revokeSignToken });
  }


  signInstrument(instrument: LegalInstrument,
                 signToken: string): Observable<LegalInstrument> {
    Assertion.assertValue(instrument, 'instrument');
    Assertion.assertValue(signToken, 'signToken');

    const path = `v2/extranet/instruments/${instrument.uid}/sign`;

    return this.http.post<LegalInstrument>(path, { signToken });
  }


  updatePreventiveNote(preventiveNote: PreventiveNote,
                       data: PreventiveNoteRequest): Observable<PreventiveNote> {
    Assertion.assertValue(preventiveNote, 'preventiveNote');
    Assertion.assertValue(data, 'data');

    const path = `v2/extranet/instruments/${preventiveNote.uid}`;

    return this.http.put<PreventiveNote>(path, data);
  }

}
