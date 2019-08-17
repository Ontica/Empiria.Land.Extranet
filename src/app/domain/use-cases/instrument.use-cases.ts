/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion } from '@app/core';

import { ElectronicFilingApiProvider } from '../providers';

import {
  Request, RequestFilter,
  PreventiveNote, PreventiveNoteEditionData,
  RequestPaymentOrderData, RequestRecordingData
} from '@app/domain/models';


@Injectable()
export class ElectronicFilingUseCases {

  constructor(private backend: ElectronicFilingApiProvider) { }


  getRequests(filter: RequestFilter): Observable<Request[]> {
    Assertion.assertValue(filter, 'filter');

    return this.backend.getRequests(filter.status, filter.keywords);
  }


  // update methods


  createPreventiveNote(data: PreventiveNoteEditionData): Observable<PreventiveNote> {
    Assertion.assertValue(data, 'data');

    return this.backend.createPreventiveNote(data);
  }


  generatePaymentOrder(request: Request,
                       data: RequestPaymentOrderData): Observable<Request> {
    Assertion.assertValue(request, 'request');

    return this.backend.generatePaymentOrder(request, data);

  }


  revokeRequestSign(request: Request,
                    revocationToken: string): Observable<Request> {
    Assertion.assertValue(request, 'request');
    Assertion.assertValue(revocationToken, 'revocationToken');

    return this.backend.revokeRequestSign(request, revocationToken);
  }


  signRequest(request: Request,
              signToken: string): Observable<Request> {
    Assertion.assertValue(request, 'request');
    Assertion.assertValue(signToken, 'signToken');

    return this.backend.signRequest(request, signToken);
  }


  submitRequest(request: Request,
                data: RequestRecordingData): Observable<Request> {
    Assertion.assertValue(request, 'request');

    return this.backend.submitRequest(request, data);
  }


  updatePreventiveNote(preventiveNote: PreventiveNote,
                       data: PreventiveNoteEditionData): Observable<PreventiveNote> {
    Assertion.assertValue(preventiveNote, 'preventiveNote');
    Assertion.assertValue(data, 'data');

    return this.backend.updatePreventiveNote(preventiveNote, data);
  }


}
