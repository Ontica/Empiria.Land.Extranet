/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SecurityUIRoutingModule } from './security-ui-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { ESignInputComponent } from './esign/esign-input.component';


/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    SecurityUIRoutingModule,
  ],

  declarations: [
    ESignInputComponent,
    UserLoginComponent
  ],

  exports: [
    ESignInputComponent,
    UserLoginComponent
  ]

})
export class SecurityUIModule { }
