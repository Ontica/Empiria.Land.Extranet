/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Command, CommandHandler } from '@app/core';

import { InstrumentUseCases } from '@app/domain/use-cases';


export enum CommandType {
  CREATE_PREVENTIVE_NOTE = 'LAND.PREVENTIVE-NOTE.CREATE',
  UPDATE_PREVENTIVE_NOTE = 'LAND.PREVENTIVE-NOTE.UPDATE',
  SIGN_LEGAL_INSTRUMENT = 'LAND.LEGAL-INSTRUMENT.SIGN',
  REVOKE_LEGAL_INSTRUMENT_SIGN = 'LAND.LEGAL-INSTRUMENT.REVOKE_SIGN'
}


@Injectable()
export class InstrumentCommandHandler extends CommandHandler {

  constructor(private useCases: InstrumentUseCases) {
    super(CommandType);
  }


  execute(command: Command): Promise<any> {
    switch (command.type as CommandType) {

      case CommandType.CREATE_PREVENTIVE_NOTE:
        return this.useCases.createPreventiveNote(command.payload.data)
          .toPromise();

      case CommandType.UPDATE_PREVENTIVE_NOTE:
        return this.useCases.updatePreventiveNote(command.payload.instrument, command.payload.data)
          .toPromise();

      case CommandType.SIGN_LEGAL_INSTRUMENT:
        return this.useCases.signInstrument(command.payload.instrument, command.payload.token)
          .toPromise();

      case CommandType.REVOKE_LEGAL_INSTRUMENT_SIGN:
        return this.useCases.revokeInstrumentSign(command.payload.instrument, command.payload.token)
          .toPromise();

      default:
          throw this.unhandledCommand(command);
    }
  }

}
