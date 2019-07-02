/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, HttpService } from '@app/core';

import { RealEstate } from '@app/models/registration';


@Injectable()
export class PropertyService {

  constructor(private http: HttpService) { }


  getRealEstate(uid: string): Observable<RealEstate> {
    Assertion.assertValue(uid, 'uid');

    const path = `v2/extranet/properties/${uid}`;

    return this.http.get<RealEstate>(path);
  }

}
