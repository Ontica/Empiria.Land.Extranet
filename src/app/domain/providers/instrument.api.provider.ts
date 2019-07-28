/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Observable } from 'rxjs';

import { LegalInstrument, LegalInstrumentStatus,
         PreventiveNote, PreventiveNoteEditionData } from '@app/domain/entities';


export abstract class InstrumentApiProvider {


  abstract getInstrument(uid: string): Observable<LegalInstrument>;


  abstract getInstruments(status?: LegalInstrumentStatus,
                          keywords?: string): Observable<LegalInstrument[]>;


  abstract createPreventiveNote(data: PreventiveNoteEditionData): Observable<PreventiveNote>;


  abstract requestPaymentOrder(instrument: LegalInstrument, data: any): Observable<LegalInstrument>;


  abstract requestRecording(instrument: LegalInstrument, data: any);


  abstract revokeInstrumentSign(instrument: LegalInstrument,
                                revokeSignToken: string);


  abstract signInstrument(instrument: LegalInstrument,
                          signToken: string): Observable<LegalInstrument>;


  abstract updatePreventiveNote(preventiveNote: PreventiveNote,
                                data: PreventiveNoteEditionData);

}
