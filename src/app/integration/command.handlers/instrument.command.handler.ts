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
  CREATE_PREVENTIVE_NOTE      = 'Land.PreventiveNote.Create',
  UPDATE_PREVENTIVE_NOTE      = 'Land.PreventiveNote.Update',
  SIGN                        = 'Land.LegalInstrument.Sign',
  REVOKE_SIGN                 = 'Land.LegalInstrument.RevokeSign',
  REQUEST_PAYMENT_ORDER       = 'Land.LegalInstrument.RequestPaymentOrder',
  FILE_TO_RECORDING_AUTHORITY = 'Land.LegalInstrument.FileToRecordingAuthority'
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

      case CommandType.SIGN:
        return this.useCases.signInstrument(command.payload.instrument, command.payload.token)
          .toPromise();

      case CommandType.REVOKE_SIGN:
        return this.useCases.revokeInstrumentSign(command.payload.instrument, command.payload.token)
          .toPromise();

      case CommandType.REQUEST_PAYMENT_ORDER:
        return this.useCases.requestPaymentOrder(command.payload.instrument, command.payload.data)
          .toPromise();

      case CommandType.FILE_TO_RECORDING_AUTHORITY:
        return this.useCases.requestRecording(command.payload.instrument, {})
          .toPromise();

      default:
          throw this.unhandledCommand(command);
    }
  }

}
