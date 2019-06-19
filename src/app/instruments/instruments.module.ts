/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InstrumentsRoutingModule } from './instruments-routing.module';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,

    InstrumentsRoutingModule
  ],

  declarations: [

  ],

  exports: [

  ]

})
export class InstrumentsModule { }
