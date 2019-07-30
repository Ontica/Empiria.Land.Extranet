/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Observable, BehaviorSubject } from 'rxjs';

import { Assertion } from '../general/assertion';

import { CommandResult, KeyValue } from '../data-types';


export type StateValues = KeyValue[];

export interface StateHandler {

  readonly selectors: string[];
  readonly actions: string[];
  readonly effects: string[];

  applyEffects(command: CommandResult): void;

  dispatch(actionType: string, payload?: any): void;

  getValue<U>(selector: string): U;

  select<U>(selector: string): Observable<U>;

}


export abstract class AbstractStateHandler<T> implements StateHandler {

  private stateItems = new Map<string, BehaviorSubject<any>>();

  readonly selectors: string[] = [];
  readonly actions: string[] = [];
  readonly effects: string[] = [];


  constructor(initialState: StateValues, selectors: any, actions: any, effects: any) {
    Assertion.assertValue(initialState, 'initialState');
    Assertion.assertValue(selectors, 'selectors');

    initialState.forEach(x => this.stateItems.set(x.key, new BehaviorSubject(x.value)));

    this.selectors = Object.keys(selectors).map(k => selectors[k as string]);

    if (actions) {
      this.actions = Object.keys(actions).map(k => actions[k as string]);
    }

    if (effects) {
      this.effects = Object.keys(effects).map(k => effects[k as string]);
    }
  }


  abstract applyEffects(command: CommandResult): void;

  abstract dispatch(actionType: string, payload?: any): void;

  abstract get state(): T;


  getValue<U>(selector: string): U {
    const stateItem = this.getStateMapItem(selector);

    return stateItem.value as U;
  }


  protected getSubject<U>(selector: string): BehaviorSubject<U> {
    const stateItem = this.getStateMapItem(selector);

    return stateItem as BehaviorSubject<U>;
  }


  select<U>(selector: string): Observable<U> {
    const stateItem = this.getStateMapItem(selector);

    return stateItem.asObservable() as Observable<U>;
  }


  protected setValue(selector: string, value: any): void {
    const stateItem = this.getStateMapItem(selector);

    if (value instanceof Observable) {
      value.toPromise().then(data => stateItem.next(data));
    } else {
      stateItem.next(value);
    }
  }


  // private methods


  private getStateMapItem(selector: string) {
    if (this.stateItems.has(selector)) {
      return this.stateItems.get(selector);
    }
    throw new Error(`There is not defined a selector with name '${selector}'.`);
  }

}
