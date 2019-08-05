/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { InstrumentApiProvider } from '@app/domain/providers/instrument.api.provider';
import { PropertyApiProvider } from '@app/domain/providers/property.api.provider';

import { InstrumentApiHttpProvider } from './http/instrument.api.http.provider';
import { PropertyApiHttpProvider } from './http/property.api.http.provider';


@NgModule({

  providers: [
    { provide: InstrumentApiProvider, useClass: InstrumentApiHttpProvider },
    { provide: PropertyApiProvider, useClass: PropertyApiHttpProvider }
  ]

})
export class BackendProvidersModule { }
