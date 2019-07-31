/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { NgModule } from '@angular/core';

import { STATE_HANDLERS } from '@app/core/presentation/presentation.state';

import { InstrumentsStateHandler } from './instruments.state.handler';


@NgModule({

  providers: [
    InstrumentsStateHandler,

    { provide: STATE_HANDLERS, useClass: InstrumentsStateHandler, multi: true }

  ]

})
export class StateHandlersModule { }
