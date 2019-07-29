/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityGuardService } from './core';
import { MainLayoutComponent, NoContentComponent } from './user-interface/main-layout';

const routes: Routes = [
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
  { path: 'search-services',
    component: MainLayoutComponent,
    canActivate: [SecurityGuardService],
    loadChildren: './user-interface/search-services/search-services.module#SearchServicesModule'
  },
  { path: 'security',
    loadChildren: './user-interface/security/security-ui.module#SecurityUIModule'
  },
  { path: '', redirectTo: 'documents', pathMatch: 'full' },
  { path: '**', component: NoContentComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
