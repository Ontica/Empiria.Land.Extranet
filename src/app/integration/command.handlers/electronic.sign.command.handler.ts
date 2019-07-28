/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Command, Assertion, CommandHandler} from '@app/core';

import { InstrumentUseCases } from '@app/domain/use-cases';


@Injectable()
export class ElectronicSignCommandHandler extends CommandHandler {

  readonly types = ['LAND.LEGAL.INSTRUMENT.SIGNED', 'LAND.LEGAL.INSTRUMENT.SIGN.REVOKED'];


  constructor(private useCases: InstrumentUseCases) {
    super();
  }


  execute(command: Command): Promise<any> {
    switch (command.type) {

      case 'LAND.LEGAL.INSTRUMENT.SIGNED':
        return this.useCases.signInstrument(command.payload.instrument, command.payload.token)
          .toPromise();

      case 'LAND.LEGAL.INSTRUMENT.SIGN.REVOKED':
        return this.useCases.revokeInstrumentSign(command.payload.instrument, command.payload.token)
          .toPromise();

      default:
        const msg = `${ElectronicSignCommandHandler.name} is not able to handle command ${command.type}.`;
        throw Assertion.assertNoReachThisCode(msg);
    }
  }

}
