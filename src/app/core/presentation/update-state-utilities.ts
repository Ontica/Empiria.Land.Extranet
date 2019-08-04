/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Assertion } from '../general/assertion';
import { Entity } from '../data-types/core-types';

import { StateSelector } from './actions.and.selectors';
import { StateHandler } from './state-handler';
import { Exception } from '../general/exception';


export class UpdateStateUtilities {


  constructor(private stateHandler: StateHandler,
              private setValueFunction: (selector: StateSelector, value: any) => void) { }


  appendToStart(arraySelector: StateSelector, itemToAppend: any): void {
    Assertion.assertValue(arraySelector, 'arraySelector');
    Assertion.assertValue(itemToAppend, 'itemToAppend');

    const currentArray = this.stateHandler.getValue(arraySelector);

    if (!(currentArray instanceof Array)) {
      throw new Exception(`State selector ${arraySelector} has a value that is not an array.`);
    }

    let newArray = [];
    if (itemToAppend instanceof Array) {
      newArray = itemToAppend.concat(currentArray);
    } else {
      newArray = [itemToAppend].concat(currentArray);
    }
    this.setValueFunction.call(this.stateHandler, arraySelector, newArray);
  }


  replaceEntity(arraySelector: StateSelector, entity: Entity): void {
    Assertion.assertValue(arraySelector, 'arraySelector');
    Assertion.assertValue(entity, 'entity');

    const currentArray = this.stateHandler.getValue(arraySelector);

    if (!(currentArray instanceof Array)) {
      throw new Exception(`State selector ${arraySelector} has a value that is not an array.`);
    }

    const indexOfEntity = currentArray.findIndex(x => x.uid === entity.uid);

    if (indexOfEntity >= 0) {
      const newArray = [...currentArray];

      newArray[indexOfEntity] = entity;

      this.setValueFunction.call(this.stateHandler, arraySelector, newArray);
    }
  }

}
