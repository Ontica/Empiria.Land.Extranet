/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Observable, BehaviorSubject } from 'rxjs';

import { Assertion } from '../general/assertion';

import { Cache, CommandResult, KeyValue, resolve } from '../data-types';

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

  dispatch<U>(actionType: StateAction, payload?: any): U extends void ? void : Promise<U>;

  getValue<U>(selector: StateSelector): U;

  select<U>(selector: StateSelector, params?: any): Observable<U>;

}

export interface SelectorConfig {
  initialState?: any;
}


export interface StateHandlerConfig {
  selectors: any;
  actions?: any;
  effects?: any;
}


export abstract class AbstractStateHandler implements StateHandler {

  readonly selectors: string[] = [];
  readonly actions: string[] = [];
  readonly effects: string[] = [];

  protected stateUpdater: UpdateStateUtilities;

  private stateItems = new Map<string, BehaviorSubject<any>>();


  constructor(config: StateHandlerConfig) {
    Assertion.assertValue(config, 'config');
    Assertion.assertValue(config.selectors, 'config.selectors');

    this.selectors = Object.keys(config.selectors).map(k => config.selectors[k as StateSelector]);

    this.selectors.forEach(x => {
      const selectorInitialState = this.getSelectorConfig(x as StateSelector).initialState;

      this.stateItems.set(x, new BehaviorSubject(selectorInitialState));
    });

    if (config.actions) {
      this.actions = Object.keys(config.actions).map(k => config.actions[k as StateAction]);
    }

    if (config.effects) {
      this.effects = Object.keys(config.effects).map(k => config.effects[k as CommandType]);
    }

    this.stateUpdater = new UpdateStateUtilities(this, this.setValue);
  }


  abstract applyEffects(command: CommandResult): void;


  abstract dispatch<U>(actionType: StateAction, payload?: any): Promise<U> | void;


  getValue<U>(selector: StateSelector): U {
    const stateItem = this.getStateMapItem(selector);

    return stateItem.value as U;
  }


  select<U>(selector: StateSelector, params?: any): Observable<U> {
    const stateItem = this.getStateMapItem(selector);

    return stateItem.asObservable() as Observable<U>;
  }



  selectMemoized<U>(selector: StateSelector, funct: () => any, key: string): Observable<U> {
    Assertion.assertValue(key, 'key');

    const stateItem = this.getStateMapItem(selector);

    const cache: Cache<Observable<U>> = stateItem.value as Cache<Observable<U>>;

    if (!cache) {
      Assertion.assertNoReachThisCode(`Uninitialized cache for selector ${selector}.`);
    }

    if (cache.has(key)) {
      console.log('cached key', key, cache.get(key));
      return cache.get(key);
    }

    cache.set(key, funct());

    return cache.get(key);
  }


  selectFirst<U>(selector: StateSelector, funct: () => any): Observable<U> {
    const stateItem = this.getStateMapItem(selector);

    if (stateItem.value && (Array.isArray(stateItem.value) && stateItem.value.length > 0)) {
      console.log('memoized from selectFirst ', selector, stateItem.value);

      return stateItem.asObservable() as Observable<U>;
    }

    this.setValue(selector, funct());

    return this.getSubject<U>(selector).asObservable();
  }


  protected getSubject<U>(selector: StateSelector): BehaviorSubject<U> {
    const stateItem = this.getStateMapItem(selector);

    return stateItem as BehaviorSubject<U>;
  }


  protected abstract getSelectorConfig(selector: StateSelector): SelectorConfig;


  protected setValue(selector: StateSelector, value: any): void;


  protected setValue<U>(selector: StateSelector, value: Observable<any>): Promise<U>;


  protected setValue<U>(selector: StateSelector, value: Observable<any> | any): Promise<U> {
    const stateItem = this.getStateMapItem(selector);

    if (value instanceof Observable) {
      return value.toPromise<U>()
        .then(x => {
          stateItem.next(x);
          return x;
        });
    } else {
      stateItem.next(value);
      return resolve<U>(value);
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
