/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Contact, DateString, Identifiable, PartitionedType } from '../core';

import { Party } from './party';
import { RealEstate } from './property';
import { RecordingActType, RecordingAct } from './recording-act';


export interface LegalInstrument extends Identifiable, PartitionedType {
  typeName: string;
  number: string;
  issueOffice: Contact;
  issuedBy: Contact;
  issueDate: DateString;
  summary: string;
  status: string;
  postingTime: DateString;
  postedBy: Contact;
}


export interface PreemptiveNote extends LegalInstrument {
  property: RealEstate;
  projectedActs: RecordingActType[];
  projectedParties: Party[];
  overNewPartition: boolean;
  projectedPartition?: RealEstate;
}


export interface Deed extends LegalInstrument {
  recordingActs: RecordingAct[];
}
