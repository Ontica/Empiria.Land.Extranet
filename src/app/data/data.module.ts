/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { DataProvidersModule } from './providers/data.providers.module';

import { InstrumentData } from './repositories/instrument.data';
import { PropertyData } from './repositories/property.data';


@NgModule({

  imports: [
    DataProvidersModule
  ],

  providers: [
    InstrumentData,
    PropertyData
  ]

})
export class DataModule { }
