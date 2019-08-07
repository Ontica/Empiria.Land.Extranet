/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Command, CommandHandler, toPromise } from '@app/core';

import { InstrumentUseCases } from '@app/domain/use-cases';


export enum CommandType {
  CREATE_PREVENTIVE_NOTE      = 'Land.PreventiveNote.Create',
  UPDATE_PREVENTIVE_NOTE      = 'Land.PreventiveNote.Update',
  SIGN                        = 'Land.LegalInstrument.Sign',
  REVOKE_SIGN                 = 'Land.LegalInstrument.RevokeSign',
  REQUEST_PAYMENT_ORDER       = 'Land.LegalInstrument.RequestPaymentOrder',
  FILE_TO_REGISTRY_AUTHORITY  = 'Land.LegalInstrument.FileToRegistryAuthority'
}


@Injectable()
export class InstrumentCommandHandler extends CommandHandler {

  constructor(private useCases: InstrumentUseCases) {
    super(CommandType);
  }


  execute<U>(command: Command): Promise<U> {
    switch (command.type as CommandType) {

      case CommandType.CREATE_PREVENTIVE_NOTE:
        return toPromise<U>(
          this.useCases.createPreventiveNote(command.payload.data)
        );

      case CommandType.UPDATE_PREVENTIVE_NOTE:
        return toPromise<U>(
          this.useCases.updatePreventiveNote(command.payload.instrument, command.payload.data)
        );

      case CommandType.SIGN:
        return toPromise<U>(
          this.useCases.signInstrument(command.payload.instrument, command.payload.token)
        );

      case CommandType.REVOKE_SIGN:
        return toPromise<U>(
          this.useCases.revokeInstrumentSign(command.payload.instrument, command.payload.token)
        );

      case CommandType.REQUEST_PAYMENT_ORDER:
        return toPromise<U>(
          this.useCases.requestPaymentOrder(command.payload.instrument, command.payload.data)
        );

      case CommandType.FILE_TO_REGISTRY_AUTHORITY:
        return toPromise<U>(
          this.useCases.fileToRegistryAuthority(command.payload.instrument, {})
        );

      default:
          throw this.unhandledCommand(command);
    }
  }

}
