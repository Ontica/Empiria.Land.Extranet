/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Displayable } from '../../common-models';


export interface SpinnerState {
  show: boolean;
}


@Injectable()
export class SpinnerService implements Displayable {

  id = Math.random();

  private spinnerSubject = new Subject<SpinnerState>();


  get spinnerState(): Observable<SpinnerState> {
    return this.spinnerSubject.asObservable();
  }


  show() {
    this.spinnerSubject.next({ show: true });
  }


  hide() {
    this.spinnerSubject.next({ show: false });
  }

}
