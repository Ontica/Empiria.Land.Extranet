/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, HttpService } from '@app/core';

import { ElectronicFilingApiProvider } from '@app/domain/providers';

import { Request, RequestStatus,
         PreventiveNote, PreventiveNoteEditionData,
         RequestPaymentOrderData, RequestRecordingData} from '@app/domain/entities';


@Injectable()
export class ElectronicFilingApiHttpProvider extends ElectronicFilingApiProvider {

  constructor(private http: HttpService) {
    super();
  }


  getRequest(uid: string): Observable<Request> {
    Assertion.assertValue(uid, 'uid');

    const path = `v2/electronic-filing/requests/${uid}`;

    return this.http.get<Request>(path);
  }


  getRequests(status?: RequestStatus,
              keywords?: string): Observable<Request[]> {
    let path = `v2/electronic-filing/requests`;

    if (status && keywords) {
      path += `/?status=${status}&keywords=${keywords}`;
    } else if (status && !keywords) {
      path += `/?status=${status}`;
    } else if (!status && keywords) {
      path += `/?keywords=${keywords}`;
    } else {
      // no-op
    }

    return this.http.get<Request[]>(path);
  }


  // command methods


  createPreventiveNote(data: PreventiveNoteEditionData): Observable<PreventiveNote> {
    Assertion.assertValue(data, 'data');

    const path = `v2/electronic-filing/requests/create-preventive-note`;

    return this.http.post<PreventiveNote>(path, data);
  }


  generatePaymentOrder(request: Request,
                       data: RequestPaymentOrderData): Observable<Request> {
    Assertion.assertValue(request, 'request');

    const path = `v2/electronic-filing/requests/${request.uid}/generate-payment-order`;

    return this.http.post<Request>(path, data);
  }


  revokeRequestSign(request: Request,
                    revokeSignToken: string) {
    Assertion.assertValue(request, 'request');
    Assertion.assertValue(revokeSignToken, 'revokeSignToken');

    const path = `v2/electronic-filing/requests/${request.uid}/revoke-sign`;

    return this.http.post<Request>(path, { revokeSignToken });
  }


  signRequest(request: Request,
              signToken: string): Observable<Request> {
    Assertion.assertValue(request, 'request');
    Assertion.assertValue(signToken, 'signToken');

    const path = `v2/electronic-filing/requests/${request.uid}/sign`;

    return this.http.post<Request>(path, { signToken });
  }


  submitRequest(request: Request,
                data: RequestRecordingData) {
    Assertion.assertValue(request, 'request');

    const path = `v2/electronic-filing/requests/${request.uid}/submit`;

    return this.http.post<Request>(path, data);
  }


  updatePreventiveNote(preventiveNote: PreventiveNote,
                       data: PreventiveNoteEditionData): Observable<PreventiveNote> {
    Assertion.assertValue(preventiveNote, 'preventiveNote');
    Assertion.assertValue(data, 'data');

    const path = `v2/electronic-filing/requests/${preventiveNote.uid}`;

    return this.http.put<PreventiveNote>(path, data);
  }

}
