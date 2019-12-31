/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Assertion, Identifiable } from '@app/core';

import { RealEstate } from '@app/domain/models';

import { RepositoryApiProvider } from '../providers';


@Injectable()
export class RepositoryUseCases {

  constructor(private backend: RepositoryApiProvider) { }


  getRealEstate(uid: string): Observable<RealEstate> {
    Assertion.assertValue(uid, 'uid');

    return this.backend.getRealEstate(uid);
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


  getRecorderOfficeMunicipalityList(recorderOfficeUID: string): Observable<Identifiable[]> {
    Assertion.assertValue(recorderOfficeUID, 'recorderOfficeUID');

    return this.backend.getRecorderOfficeMunicipalityList(recorderOfficeUID);
  }

}
