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


export type RequestStatus = 'Pending' | 'Signed' | 'OnPayment' | 'Submitted' | 'Finished' | 'Rejected' | 'All';


export interface Request extends Identifiable, PartitionedType {
  typeName: string;
  number: string;
  requestedBy: string;
  issueOffice: Contact;
  issuedBy: Contact;
  issueDate: DateString;
  summary: string;
  status: RequestStatus;
  statusName: string;
  postingTime: DateString;
  postedBy: Contact;
  signed: boolean;
  submitted: boolean;
  esign?: ESignData;
  transaction: Transaction;
}


export interface PreventiveNote extends Request {
  property: RealEstate;
  projectedOperation: string;
}


export interface PreventiveNoteEditionData {
  requestedBy: string;
  propertyUID: string;
  projectedOperation: string;
}


export interface Deed extends Request {
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


export const EmptyRequest: Request = {
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
  signed: false,
  submitted: false,
  transaction: EmptyTransaction
};


export interface RequestFilter {
  status: RequestStatus;
  keywords: string;
}


export const EmptyRequestFilter: RequestFilter = {
  status: 'All',
  keywords: '',
};
