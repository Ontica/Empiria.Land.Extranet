/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { BackendProvidersModule } from '@app/integration/backend-providers/backend.providers.module';

import { InstrumentMethods } from './instrument.methods';
import { PropertyMethods } from './property.methods';


@NgModule({

  imports: [
    BackendProvidersModule
  ],

  providers: [
    InstrumentMethods,
    PropertyMethods
  ]

})
export class DomainModule { }
