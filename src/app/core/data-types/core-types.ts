/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export interface Identifiable {
  readonly uid: string;
  name: string;
}


export const Empty: Identifiable = {
  uid: '',
  name: '',
};


export interface PartitionedType {
  type: string;
}


export interface Quantity {
  unit: Identifiable;
  amount: number;
}

export const EmptyQuantity: Quantity = {
  unit: Empty,
  amount: 0
};


export interface Money {
  currency: Identifiable;
  amount: number;
}


export function isEmpty(instance: Identifiable): boolean {
  return (!instance || !instance.uid ||
          instance.uid === '' || instance.uid === 'Empty');
}


export function isTypeOf(instance: PartitionedType, typeName: string) {
  if (!instance) {
    return false;
  }
  return (instance.type === typeName);
}
