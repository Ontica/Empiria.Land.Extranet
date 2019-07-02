/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { InstrumentService } from './instrument.service';
import { PropertyService } from './property.service';


@NgModule({

  providers: [
    InstrumentService,
    PropertyService
  ]

})
export class ServicesModule { }
