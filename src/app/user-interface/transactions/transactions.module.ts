/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { SharedModule } from '@app/shared/shared.module';

import { TransactionsMainPageComponent } from './main-page/transactions-main-page.component';


@NgModule({

  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,

    TransactionsRoutingModule
  ],

  declarations: [
    TransactionsMainPageComponent
  ],

  exports: []

})
export class TransactionsModule { }
