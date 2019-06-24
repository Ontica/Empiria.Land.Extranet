/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Identifiable, PartitionedType, Quantity } from '../core/core-types';


export interface Property extends Identifiable, PartitionedType {

}


export interface Association extends Property {
  associationType: Identifiable;
}


export interface RealEstate extends Property {
  realEstateType: Identifiable;
  cadastralKey: string;
  metesAndBounds: string;
  district: Identifiable;
  municipality: Identifiable;
  location: string;
  lotSize: Quantity;
  notes: string;
  isPartition: boolean;
  partitionOf: Identifiable;
}
