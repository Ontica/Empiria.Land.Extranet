/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { ElectronicSignService } from './electronic-sign.service';


@NgModule({

  providers: [
    ElectronicSignService
  ]

})
export class ServicesModule { }
