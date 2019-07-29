/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AngularMaterialModule } from './angular-material.module';
import { AngularFlexLayoutModule } from './angular-flex-layout.module';

import { CardComponent } from './card/card.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { FileControlComponent } from './file-control/file-control.component';
import { InlineEditorComponent } from './inline-editor/inline-editor.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { ModalWindowComponent } from './modal-window/modal-window';
import { ObjectComponent } from './object/object.component';
import { RagStatusComponent } from './rag-status/rag-status.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { ESignInputComponent } from './esign/esign-input.component';

import { MessageBoxService } from './message-box/message.box.service';
import { SpinnerService } from './spinner/spinner.service';

import { NoContentComponent } from './no-content.component';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    AngularMaterialModule,
    AngularFlexLayoutModule
  ],

  declarations: [
    DatepickerComponent,
    FileControlComponent,

    CardComponent,
    InlineEditorComponent,
    MessageBoxComponent,
    ModalWindowComponent,
    ObjectComponent,
    RagStatusComponent,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchBoxComponent,
    SpinnerComponent,

    ESignInputComponent,

    NoContentComponent
  ],

  exports: [
    CardComponent,
    DatepickerComponent,
    FileControlComponent,
    InlineEditorComponent,
    MessageBoxComponent,
    ModalWindowComponent,
    ObjectComponent,
    RagStatusComponent,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchBoxComponent,
    SpinnerComponent,

    ESignInputComponent,

    NoContentComponent,
  ],

  providers: [
    MessageBoxService,
    SpinnerService
  ],

  entryComponents: [
    MessageBoxComponent
  ]

})
export class SharedModule { }
