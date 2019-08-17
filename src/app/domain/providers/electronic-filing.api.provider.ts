/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Observable } from 'rxjs';

import { Request, RequestStatus,
         PreventiveNote, PreventiveNoteEditionData,
         RequestPaymentOrderData, RequestRecordingData } from '@app/domain/entities';


export abstract class ElectronicFilingApiProvider {


  abstract getRequest(uid: string): Observable<Request>;


  abstract getRequests(status?: RequestStatus,
                       keywords?: string): Observable<Request[]>;

  // command methods

  abstract createPreventiveNote(data: PreventiveNoteEditionData): Observable<PreventiveNote>;


  abstract generatePaymentOrder(request: Request,
                                data: RequestPaymentOrderData): Observable<Request>;



  abstract revokeRequestSign(request: Request,
                             revokeSignToken: string);


  abstract signRequest(request: Request,
                       signToken: string): Observable<Request>;


  abstract submitRequest(request: Request,
                         data: RequestRecordingData): Observable<Request>;


  abstract updatePreventiveNote(preventiveNote: PreventiveNote,
                                data: PreventiveNoteEditionData);

}
