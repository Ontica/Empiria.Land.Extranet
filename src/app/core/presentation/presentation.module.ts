/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { FrontController } from './front.controller';

import { PresentationState } from './presentation.state';

import { PresentationCommandHandlersModule } from '@app/integration/presentation.command.handlers/presentation.command.handlers.module';

@NgModule({

  imports: [
    PresentationCommandHandlersModule
  ],

  providers: [
    FrontController,
    PresentationState
  ]

})
export class PresentationModule { }
