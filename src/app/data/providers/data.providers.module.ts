/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { InstrumentDataProvider } from './interfaces/instrument.data.provider';
import { PropertyDataProvider } from './interfaces/property.data.provider';

import { InstrumentHttpDataProvider } from './http-providers/instrument.http.data.provider';
import { PropertyHttpDataProvider } from './http-providers/property.http.data.provider';


@NgModule({

  providers: [
    { provide: InstrumentDataProvider, useClass: InstrumentHttpDataProvider },
    { provide: PropertyDataProvider, useClass: PropertyHttpDataProvider }
  ]

})
export class DataProvidersModule { }
