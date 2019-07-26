/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { FrontController } from './front.controller';

import { PresentationState } from './presentation.state';

import { CommandHandlersModule } from '@app/integration/command.handlers/command.handlers.module';

@NgModule({

  imports: [
    CommandHandlersModule
  ],

  providers: [
    FrontController,
    PresentationState
  ]

})
export class PresentationModule { }
