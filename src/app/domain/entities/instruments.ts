/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Contact, DateString, Identifiable, PartitionedType, Empty } from '@app/core';

import { RealEstate } from './property';
import { RecordingAct } from './recording-act';


export interface ESignData {
  hash: string;
  seal: string;
  sign: string;
}


export interface Transaction {
  id: number;
  uid: string;
  status: string;
  sendTo: string;
  rfc: string;
  receiptNo: string;
  total: number;
  presentationDate: DateString;
}


export type LegalInstrumentStatus = 'Pending' | 'Signed' | 'Requested' | 'Returned' | 'Finished' | 'All';


export interface LegalInstrument extends Identifiable, PartitionedType {
  typeName: string;
  number: string;
  requestedBy: string;
  issueOffice: Contact;
  issuedBy: Contact;
  issueDate: DateString;
  summary: string;
  status: LegalInstrumentStatus;
  statusName: string;
  postingTime: DateString;
  postedBy: Contact;
  isSigned: boolean;
  isRequested: boolean;
  esign?: ESignData;
  transaction: Transaction;
}


export interface PreventiveNote extends LegalInstrument {
  property: RealEstate;
  projectedOperation: string;
}


export interface PreventiveNoteRequest {
  requestedBy: string;
  propertyUID: string;
  projectedOperation: string;
}


export interface Deed extends LegalInstrument {
  recordingActs: RecordingAct[];
}


export const EmptyTransaction: Transaction = {
  id: 0,
  uid: '',
  status: '',
  sendTo: '',
  rfc: '',
  receiptNo: '',
  total: 0,
  presentationDate: ''
};


export const EmptyLegalInstrument: LegalInstrument = {
  uid: '',
  name: '',
  type: '',
  typeName: '',
  number: '',
  requestedBy: '',
  issueOffice: Empty,
  issuedBy: Empty,
  issueDate: '',
  summary: '',
  status: 'Pending',
  statusName: '',
  postingTime: '',
  postedBy: Empty,
  isSigned: false,
  isRequested: false,
  transaction: EmptyTransaction
};


export interface LegalInstrumentFilter {
  status: LegalInstrumentStatus;
  keywords: string;
}


export const EmptyLegalInstrumentFilter: LegalInstrumentFilter = {
  status: 'All',
  keywords: '',
};
