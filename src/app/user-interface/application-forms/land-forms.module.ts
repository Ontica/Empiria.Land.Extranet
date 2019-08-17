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
import { AngularFlexLayoutModule } from '@app/shared/angular-flex-layout.module';

import { SharedContainersModule } from '@app/shared/containers/shared-containers.module';
import { SharedFormControlsModule } from '@app/shared/form-controls/shared-form-controls.module';
import { SharedIndicatorsModule } from '@app/shared/indicators/shared-indicators.module';

import { DeedComponent } from '../application-forms/land-forms/deed.component';
import { DefinitiveNoteComponent } from '../application-forms/land-forms/definitive-note.component';
import { FolioRealRequestComponent } from '../application-forms/land-forms/folio-real-request.component';
import { PreventiveNoteComponent } from '../application-forms/land-forms/preventive-note.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AngularFlexLayoutModule,

    SharedContainersModule,
    SharedFormControlsModule,
    SharedIndicatorsModule
  ],

  declarations: [
    DeedComponent,
    DefinitiveNoteComponent,
    FolioRealRequestComponent,
    PreventiveNoteComponent
  ],

  exports: [
    DeedComponent,
    DefinitiveNoteComponent,
    FolioRealRequestComponent,
    PreventiveNoteComponent
  ]

})
export class LandFormsModule { }
