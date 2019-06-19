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
        path: 'search', component: MainLayoutComponent,
        canActivate: [SecurityGuardService],
        children: [
          { path: 'all', component: NoContentComponent },
          { path: 'real-estate', component: NoContentComponent },
          { path: 'associations', component: NoContentComponent },
          { path: 'persons', component: NoContentComponent },
          { path: 'documents', component: NoContentComponent },
          { path: 'certificates', component: NoContentComponent },
          { path: 'transactions', component: NoContentComponent },
          { path: 'books', component: NoContentComponent },
          { path: '', redirectTo: 'all', pathMatch: 'full' }
        ]
      }
    ])],

  exports: [RouterModule]

})
export class SearchRoutingModule { }
