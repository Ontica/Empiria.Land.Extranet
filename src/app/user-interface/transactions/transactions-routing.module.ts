/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoContentComponent } from '@app/shared/no-content.component';


const routes: Routes = [
  { path: 'pending', component: NoContentComponent },
  { path: 'payment', component: NoContentComponent },
  { path: 'process', component: NoContentComponent },
  { path: 'finished', component: NoContentComponent },
  { path: 'returned', component: NoContentComponent },
  { path: 'all', component: NoContentComponent },
  { path: '', redirectTo: 'pending', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
