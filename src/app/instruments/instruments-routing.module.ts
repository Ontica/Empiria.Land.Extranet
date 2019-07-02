/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SecurityGuardService } from '@app/core';

import { MainLayoutComponent } from '@app/shared';
import { InstrumentsMainPageComponent } from './main-page/instruments-main-page.component';

@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'documents', component: MainLayoutComponent,
        canActivate: [SecurityGuardService],
        children: [
          { path: 'pending', component: InstrumentsMainPageComponent },
          { path: 'to-sign', component: InstrumentsMainPageComponent },
          { path: 'signed', component: InstrumentsMainPageComponent },
          { path: 'requested', component: InstrumentsMainPageComponent },
          { path: 'all', component: InstrumentsMainPageComponent },
          { path: '', redirectTo: 'pending', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class InstrumentsRoutingModule { }
