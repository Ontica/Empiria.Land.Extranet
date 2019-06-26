/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '@app/shared/angular-material.module';

import { InstrumentsRoutingModule } from './instruments-routing.module';

import { InstrumentsMainPageComponent } from './main-page/instruments-main-page.component';
import { InstrumentListComponent } from './list/instrument-list.component';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,

    InstrumentsRoutingModule
  ],

  declarations: [
    InstrumentsMainPageComponent,
    InstrumentListComponent
  ],

  exports: [

  ]

})
export class InstrumentsModule { }
