/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Action, Assertion, CommandHandler } from '@app/core';

import { InstrumentUseCases } from '@app/domain/use-cases';


@Injectable()
export class InstrumentCommandHandler extends CommandHandler {

  readonly types = ['LAND.PREVENTIVE.NOTE.CREATE', 'LAND.PREVENTIVE.NOTE.UPDATE'];

  constructor(private useCases: InstrumentUseCases) {
    super();
  }

  execute(action: Action): Promise<any> {
    switch (action.type) {

      case 'LAND.PREVENTIVE.NOTE.CREATE':
        return this.useCases.createPreventiveNote(action.payload.data)
          .toPromise();

      case 'LAND.PREVENTIVE.NOTE.UPDATE':
        return this.useCases.updatePreventiveNote(action.payload.instrument, action.payload.data)
          .toPromise();

      default:
        const msg = `${InstrumentCommandHandler.name} is not able to handle action ${action.type}.`;
        throw Assertion.assertNoReachThisCode(msg);
    }
  }

}
