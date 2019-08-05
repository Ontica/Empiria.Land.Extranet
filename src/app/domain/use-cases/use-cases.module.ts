/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { BackendProvidersModule } from '@app/integration/backend.providers/backend.providers.module';

import { InstrumentUseCases } from './instrument.use-cases';
import { PropertyUseCases } from './property.use-cases';


@NgModule({

  imports: [
    BackendProvidersModule
  ],

  providers: [
    InstrumentUseCases,
    PropertyUseCases
  ]

})
export class UseCasesModule { }
