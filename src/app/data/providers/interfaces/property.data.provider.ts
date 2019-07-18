/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Observable } from 'rxjs';

import { RealEstate } from '@app/models/registration';


export abstract class PropertyDataProvider {

  abstract getRealEstate(uid: string): Observable<RealEstate>;

}
