/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Assertion } from '@app/core';

import { RealEstate, Property } from '@app/models/registration';

import { PropertyApiProvider } from './providers';


@Injectable()
export class PropertyMethods {

  private cache = new Map<string, Property>();


  constructor(private backend: PropertyApiProvider) { }


  getRealEstate(propertyUID: string): Observable<RealEstate> {
    Assertion.assertValue(propertyUID, 'propertyUID');

    if (this.cache.has(propertyUID)) {
      return of(this.cache.get(propertyUID) as RealEstate);
    }

    return this.backend.getRealEstate(propertyUID)
      .pipe(
        tap(x => {
          this.cache.set(x.uid, x);
        })
      );
  }

}
