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

import { DatepickerComponent } from './datepicker/datepicker.component';
import { FileControlComponent } from './file-control/file-control.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { MainMenuComponent } from './main-layout/main-menu/main-menu.component';

import { CardComponent } from './card/card.component';
import { InlineEditorComponent } from './inline-editor/inline-editor.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { ModalWindowComponent } from './modal-window/modal-window';
import { NavigationHeaderComponent } from './nav-header/nav-header.component';
import { NavigationMenuComponent } from './nav-menu/nav-menu.component';
import { NoContentComponent } from './no-content/no-content.component';
import { ObjectComponent } from './object/object.component';
import { RagStatusComponent } from './rag-status/rag-status.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { AngularMaterialModule } from './angular-material.module';

import { MessageBoxService } from './message-box/message.box.service';
import { SharedService } from './shared.service';
import { SpinnerService } from './spinner/spinner.service';


@NgModule({

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    AngularMaterialModule
  ],

  declarations: [
    DatepickerComponent,
    FileControlComponent,
    MainLayoutComponent,
    MainMenuComponent,

    CardComponent,
    InlineEditorComponent,
    MessageBoxComponent,
    ModalWindowComponent,
    NavigationHeaderComponent,
    NavigationMenuComponent,
    NoContentComponent,
    ObjectComponent,
    RagStatusComponent,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchBoxComponent,
    SpinnerComponent
  ],

  exports: [
    CardComponent,
    DatepickerComponent,
    FileControlComponent,
    InlineEditorComponent,
    MainLayoutComponent,
    MessageBoxComponent,
    ModalWindowComponent,
    NavigationHeaderComponent,
    NoContentComponent,
    ObjectComponent,
    RagStatusComponent,
    SafeHtmlPipe,
    SafeUrlPipe,
    SearchBoxComponent,
    SpinnerComponent
  ],

  providers: [
    MessageBoxService,
    SharedService,
    SpinnerService
  ],

  entryComponents: [
    MessageBoxComponent
  ]

})
export class SharedModule { }
