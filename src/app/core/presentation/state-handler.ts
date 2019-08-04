/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Observable, BehaviorSubject } from 'rxjs';

import { Assertion } from '../general/assertion';

import { CommandResult, KeyValue } from '../data-types';

import { StateAction, StateSelector } from './state.commands';
import { CommandType } from './commands';

import { UpdateStateUtilities } from './update-state-utilities';


export type StateValues = KeyValue[];

export interface StateHandler {

  readonly selectors: string[];
  readonly actions: string[];
  readonly effects: string[];

  applyEffects(command: CommandResult): void;

  dispatch(actionType: StateAction, payload?: any): void;
  dispatch<U>(actionType: StateAction, payload?: any): Promise<U>;

  getValue<U>(selector: StateSelector): U;

  select<U>(selector: StateSelector): Observable<U>;

}

export abstract class AbstractStateHandler<T> implements StateHandler {

  private stateItems = new Map<string, BehaviorSubject<any>>();

  readonly selectors: string[] = [];
  readonly actions: string[] = [];
  readonly effects: string[] = [];

  protected stateUpdater: UpdateStateUtilities;


  constructor(initialState: StateValues, selectors: any, actions: any, effects: any) {
    Assertion.assertValue(initialState, 'initialState');
    Assertion.assertValue(selectors, 'selectors');

    initialState.forEach(x => this.stateItems.set(x.key, new BehaviorSubject(x.value)));

    this.selectors = Object.keys(selectors).map(k => selectors[k as StateSelector]);

    if (actions) {
      this.actions = Object.keys(actions).map(k => actions[k as StateAction]);
    }

    if (effects) {
      this.effects = Object.keys(effects).map(k => effects[k as CommandType]);
    }

    this.stateUpdater = new UpdateStateUtilities(this, this.setValue);
  }


  abstract applyEffects(command: CommandResult): void;

  abstract dispatch<U>(actionType: StateAction, payload?: any): Promise<U>;

  abstract get state(): T;


  getValue<U>(selector: StateSelector): U {
    const stateItem = this.getStateMapItem(selector);

    return stateItem.value as U;
  }


  protected getSubject<U>(selector: StateSelector): BehaviorSubject<U> {
    const stateItem = this.getStateMapItem(selector);

    return stateItem as BehaviorSubject<U>;
  }


  select<U>(selector: StateSelector): Observable<U> {
    const stateItem = this.getStateMapItem(selector);

    return stateItem.asObservable() as Observable<U>;
  }


  protected setValue(selector: StateSelector, value: any): void {
    const stateItem = this.getStateMapItem(selector);

    if (value instanceof Observable) {
      value.toPromise().then(data => stateItem.next(data));
    } else {
      stateItem.next(value);
    }
  }


  protected unhandledCommandOrActionType(commandOrActionType: CommandResult | string): never {
    let msg = `${AbstractStateHandler.name} is not able to handle `;

    if (typeof commandOrActionType === 'string') {
      msg += `action '${commandOrActionType}.'`;
    } else {
      msg += `command '${commandOrActionType.type}.'`;
    }

    throw Assertion.assertNoReachThisCode(msg);
  }


  // private methods


  private getStateMapItem(selector: StateSelector) {
    if (this.stateItems.has(selector)) {
      return this.stateItems.get(selector);
    }
    throw new Error(`There is not defined a selector with name '${selector}'.`);
  }

}
