/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Observable } from 'rxjs';

import { RealEstate } from '@app/domain/entities';


export abstract class PropertyApiProvider {

  abstract getRealEstate(uid: string): Observable<RealEstate>;

}
