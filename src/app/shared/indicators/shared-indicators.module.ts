/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../angular-material.module';


import { RagStatusComponent } from './rag-status/rag-status.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';


@NgModule({

  imports: [
    CommonModule,

    AngularMaterialModule
  ],

  declarations: [
    RagStatusComponent,
    SpinnerComponent
  ],

  exports: [
    RagStatusComponent,
    SpinnerComponent
  ],

  providers: [
    SpinnerService
  ]

})
export class SharedIndicatorsModule { }
