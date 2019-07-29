/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityGuardService } from './core';
import { MainLayoutComponent } from './user-interface/main-layout';
import { NoContentComponent } from './shared/no-content.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'documents', pathMatch: 'full' },
  { path: 'documents',
    component: MainLayoutComponent,
    canActivate: [SecurityGuardService],
    loadChildren: './user-interface/instruments/instruments.module#InstrumentsModule'
  },
  { path: 'transactions',
    component: MainLayoutComponent,
    canActivate: [SecurityGuardService],
    loadChildren: './user-interface/transactions/transactions.module#TransactionsModule'
  },
  { path: 'search',
    component: MainLayoutComponent,
    canActivate: [SecurityGuardService],
    loadChildren: './user-interface/search/search.module#SearchModule'
  },
  { path: 'security',
    loadChildren: './user-interface/security/security-ui.module#SecurityUIModule'
  },
  { path: '**', component: NoContentComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
