/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { DateString, Entity } from '@app/core';

import { RealEstate } from './property';


export interface Transaction extends Entity {
  id: number;
  status: string;
  presentationDate: DateString;
}


export type FilingRequestStatusType = 'Pending' | 'Signed' | 'OnPayment' | 'Submitted' |
                                      'Finished' | 'Rejected' | 'All';


export interface FilingRequestStatus {
  type: FilingRequestStatusType;
  name: string;
}


export interface Requester {
  name: string;
  email?: string;
  phone?: string;
  rfc?: string;
}


export const EmptyRequester: Requester = {
  name: '',
  email: '',
  phone: '',
  rfc: ''
};


export interface Preparer {
  agency: string;
  agent: string;
}


export interface PaymentOrderData {
  routeNumber: string;
  dueDate: DateString;
  total: number;
  receiptNo?: string;
}

export type ProcedureType = 'AvisoPreventivo' | 'SegundoAvisoDefinitivo' | 'InscripcionEscrituraPublica' |
                            'CertificadoLibertad' | 'CertificadoInscripcion' | 'CertificadoNoInscripcion' |
                            'CertificadoPropiedad' | 'CopiaCertificada' | 'CancelacionAvisoPreventivo' |
                            'SolicitudFolioReal' | 'Aclaracion' | 'NoDeterminado';


export type ApplicationFormType = ProcedureType;


export type ApplicationFormFields = PreventiveNote | Deed;


export interface ApplicationForm extends Entity {
  type: ApplicationFormType;
  typeName: string;
  filledOutBy: string;
  filledOutTime: DateString;
  fields: ApplicationFormFields;
}


export interface ESignData {
  hash: string;
  seal: string;
  sign: string;
}


export interface EFilingRequest extends Entity {
  procedureType: ProcedureType;
  requestedBy: Requester;
  preparer: Preparer;
  summary: string;
  lastUpdateTime: DateString;
  status: FilingRequestStatus;
  form?: ApplicationForm;
  paymentOrder?: PaymentOrderData;
  esign?: ESignData;
  transaction?: Transaction;
}


export interface PreventiveNote {
  propertyUID: string;
  projectedOperation: string;
}


export interface Deed {
  property: RealEstate;
}


export const EmptyTransaction: Transaction = {
  id: 0,
  uid: '',
  status: '',
  presentationDate: ''
};


export const EmptyEFilingRequest: EFilingRequest = {
  uid: '',
  procedureType: 'NoDeterminado',
  requestedBy: {
    name: '',
    email: '',
    phone: '',
    rfc: ''
  },
  preparer: {
    agency: '',
    agent: '',
  },
  summary: '',
  form: null,
  lastUpdateTime: '',
  status: {
    type: 'Pending',
    name: 'Pendiente'
  },
  esign: null,
  transaction: EmptyTransaction
};


export interface EFilingRequestFilter {
  status: FilingRequestStatusType;
  keywords: string;
}


export const EmptyEFilingRequestFilter: EFilingRequestFilter = {
  status: 'All',
  keywords: '',
};
