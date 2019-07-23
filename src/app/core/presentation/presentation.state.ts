/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { Action, Assertion } from '@app/core';


@Injectable()
export class PresentationState {

  private readonly state = new Map<string, BehaviorSubject<any>>();

  constructor() { }


  dispatch(action: Action): void {
    Assertion.assertValue(action, 'action');

    switch (action.type) {
      case '':
        return;
      default:
        this.setValue(action.type, action.payload);
    }
    console.log('Action dispatched to PresentationLayer', action);
  }


  hasSelector(selector: string) {
    return this.state.has(selector);
  }


  getValue<T>(selector: string, defaultValue?: T): T {
    if (this.state.has(selector)) {
      const subject = this.state.get(selector) as BehaviorSubject<T>;

      return subject.value;

    } else {
      return defaultValue;
    }
  }


  setValue<T>(selector: string, value: T) {
    if (!this.state.has(selector)) {
      this.state.set(selector, new BehaviorSubject<T>(value));
    } else {
      const subject = this.state.get(selector) as BehaviorSubject<T>;

      subject.next(value);
    }
  }


  subscribe<T>(selector: string): Observable<T> {
    if (this.state.has(selector)) {
      const subject = this.state.get(selector) as BehaviorSubject<T>;

      return subject.asObservable();

    } else {
      return of({}) as Observable<T>;
    }
  }

}
