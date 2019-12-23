/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, HttpService, Identifiable } from '@app/core';

import { RepositoryApiProvider } from '@app/domain/providers';

import { RealEstate } from '@app/domain/entities';


@Injectable()
export class RepositoryApiHttpProvider extends RepositoryApiProvider {

  constructor(private http: HttpService) {
    super();
  }


  getRealEstate(uid: string): Observable<RealEstate> {
    Assertion.assertValue(uid, 'uid');

    const path = `v2/extranet/properties/${uid}`;

    return this.http.get<RealEstate>(path);
  }


  getRealEstateTypeList(): Observable<Identifiable[]> {
    const path = `v2/catalogues/real-estate-types`;

    console.log('getRealEstateTypeList called');

    return this.http.get<Identifiable[]>(path);
  }


  getRecorderOfficeList(): Observable<Identifiable[]> {
    const path = `v2/catalogues/recorder-offices`;

    console.log('getRecorderOfficeList called');

    return this.http.get<Identifiable[]>(path);
  }


  getRecorderOfficeDomainBookList(recorderOfficeUID: string): Observable<Identifiable[]> {
    Assertion.assertValue(recorderOfficeUID, 'recorderOfficeUID');

    const path = `v2/catalogues/recorder-offices/${recorderOfficeUID}/domain-recording-books`;

    return this.http.get<Identifiable[]>(path);
  }


  getRecorderOfficeMuncipalityList(recorderOfficeUID: string): Observable<Identifiable[]> {
    Assertion.assertValue(recorderOfficeUID, 'recorderOfficeUID');

    const path = `v2/catalogues/recorder-offices/${recorderOfficeUID}/municipalities`;

    return this.http.get<Identifiable[]>(path);
  }

}
