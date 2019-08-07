/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, HttpService } from '@app/core';

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

}
