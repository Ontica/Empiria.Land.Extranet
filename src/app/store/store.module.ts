/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInterfaceStore } from './ui.store';


@NgModule({

  imports: [
    CommonModule
  ],

  providers: [
    UserInterfaceStore
  ]

})
export class StoreModule { }
