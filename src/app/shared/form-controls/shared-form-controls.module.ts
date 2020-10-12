/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';

import { DatepickerComponent } from './datepicker/datepicker.component';
import { ESignInputComponent } from './esign/esign-input.component';
import { FileControlComponent } from './file-control/file-control.component';
import { InlineEditorComponent } from './inline-editor/inline-editor.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,

    AngularMaterialModule
  ],

  declarations: [
    DatepickerComponent,
    ESignInputComponent,
    FileControlComponent,
    InlineEditorComponent,
    SearchBoxComponent,
    ImageCarouselComponent
  ],

  exports: [
    DatepickerComponent,
    ESignInputComponent,
    FileControlComponent,
    InlineEditorComponent,
    SearchBoxComponent
  ],

})
export class SharedFormControlsModule { }
