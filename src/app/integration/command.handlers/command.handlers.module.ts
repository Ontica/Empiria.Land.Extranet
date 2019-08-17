/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { COMMAND_HANDLERS } from '@app/core/presentation/front.controller';

import { RequestCommandHandler } from './instrument.command.handler';


@NgModule({

  providers: [
    RequestCommandHandler,

    { provide: COMMAND_HANDLERS, useExisting: RequestCommandHandler, multi: true }
  ]

})
export class CommandHandlersModule { }
