/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Assertion, Cache, Identifiable } from '@app/core';

import { RealEstate, Property } from '@app/domain/models';

import { RepositoryApiProvider } from '../providers';



@Injectable()
export class RepositoryUseCases {

  private realEstateCache = new Cache<Property>();

  constructor(private backend: RepositoryApiProvider) { }


  getRealEstate(uid: string): Observable<RealEstate> {
    Assertion.assertValue(uid, 'uid');

    if (this.realEstateCache.has(uid)) {
      return of(this.realEstateCache.get(uid) as RealEstate);
    }

    return this.backend.getRealEstate(uid)
      .pipe(
        tap(x => {
          this.realEstateCache.set(x.uid, x);
        })
      );
  }


  getRealEstateTypeList() {
    return this.backend.getRealEstateTypeList();
  }


  getRecorderOfficeList(): Observable<Identifiable[]> {
    return this.backend.getRecorderOfficeList();
  }


  getRecorderOfficeDomainBookList(recorderOfficeUID: string): Observable<Identifiable[]> {
    Assertion.assertValue(recorderOfficeUID, 'recorderOfficeUID');

    return this.backend.getRecorderOfficeDomainBookList(recorderOfficeUID);
  }


  getRecorderOfficeMuncipalityList(recorderOfficeUID: string): Observable<Identifiable[]> {
    Assertion.assertValue(recorderOfficeUID, 'recorderOfficeUID');

    return this.backend.getRecorderOfficeMuncipalityList(recorderOfficeUID);
  }

}
