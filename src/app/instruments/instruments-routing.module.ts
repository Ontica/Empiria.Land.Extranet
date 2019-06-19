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
import { NoContentComponent } from '@app/shared/no-content/no-content.component';

@NgModule({

  imports: [
    RouterModule.forChild([
      {
        path: 'instruments', component: MainLayoutComponent,
        canActivate: [SecurityGuardService],
        children: [
          { path: 'pending', component: NoContentComponent },
          { path: 'signed', component: NoContentComponent },
          { path: 'requested', component: NoContentComponent },
          { path: '', redirectTo: 'pending', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class InstrumentsRoutingModule { }
