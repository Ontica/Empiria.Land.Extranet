/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { COMMAND_HANDLERS } from '@app/core/presentation/front.controller';

import { InstrumentCommandHandler } from './instrument.command.handler';
import { ElectronicSignCommandHandler } from './electronic.sign.command.handler';


@NgModule({

  providers: [
    InstrumentCommandHandler,
    ElectronicSignCommandHandler,

    { provide: COMMAND_HANDLERS, useClass: InstrumentCommandHandler, multi: true },
    { provide: COMMAND_HANDLERS, useClass: ElectronicSignCommandHandler, multi: true },
  ]

})
export class CommandHandlersModule { }
