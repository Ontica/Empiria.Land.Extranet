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
import { SharedModule } from '@app/shared/shared.module';

import { CreateInstrumentWizardComponent } from './create-wizard/create-instrument-wizard.component';
import { DeedComponent } from './editors/deed.component';
import { DefinitiveNoteComponent } from './editors/definitive-note.component';
import { FolioRealRequestComponent } from './editors/folio-real-request.component';
import { InstrumentFilingComponent } from './filing/instrument-filing.component';
import { InstrumentListComponent } from './list/instrument-list.component';
import { InstrumentListItemComponent } from './list/instrument-list-item.component';
import { InstrumentsMainPageComponent } from './main-page/instruments-main-page.component';
import { InstrumentSignRequestComponent } from './sign-request/instrument-sign-request.component';
import { PreventiveNoteComponent } from './editors/preventive-note.component';

import { InstrumentsRoutingModule } from './instruments-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AngularFlexLayoutModule,
    SharedModule,
    InstrumentsRoutingModule
  ],

  declarations: [
    CreateInstrumentWizardComponent,
    DeedComponent,
    DefinitiveNoteComponent,
    FolioRealRequestComponent,
    InstrumentFilingComponent,
    InstrumentListComponent,
    InstrumentListItemComponent,
    InstrumentsMainPageComponent,
    InstrumentSignRequestComponent,
    PreventiveNoteComponent
  ],

  exports: []

})
export class InstrumentsModule { }
