/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InstrumentsMainPageComponent } from './main-page/instruments-main-page.component';


const routes: Routes = [
  { path: 'pending', component: InstrumentsMainPageComponent },
  { path: 'signed', component: InstrumentsMainPageComponent },
  { path: 'requested', component: InstrumentsMainPageComponent },
  { path: 'all', component: InstrumentsMainPageComponent },
  { path: '', redirectTo: 'pending', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstrumentsRoutingModule { }
