/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Command, CommandHandler, toPromise } from '@app/core';

import { ElectronicFilingUseCases } from '@app/domain/use-cases';


export enum CommandType {
  CREATE_PREVENTIVE_NOTE = 'Land.PreventiveNote.Create',
  UPDATE_PREVENTIVE_NOTE = 'Land.PreventiveNote.Update',
  SIGN                   = 'OnePoint.ElectronicFiling.SignRequest',
  REVOKE_SIGN            = 'OnePoint.ElectronicFiling.RevokeRequestSign',
  GENERATE_PAYMENT_ORDER = 'OnePoint.ElectronicFiling.GeneratePaymentOrderForRequest',
  REQUEST_SUBMISSION     = 'OnePoint.ElectronicFiling.RequestSubmission'
}


@Injectable()
export class ElectronicFilingCommandHandler extends CommandHandler {

  constructor(private useCases: ElectronicFilingUseCases) {
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
          this.useCases.updatePreventiveNote(command.payload.request, command.payload.data)
        );

      case CommandType.SIGN:
        return toPromise<U>(
          this.useCases.signRequest(command.payload.request, command.payload.token)
        );

      case CommandType.REVOKE_SIGN:
        return toPromise<U>(
          this.useCases.revokeRequestSign(command.payload.request, command.payload.token)
        );

      case CommandType.GENERATE_PAYMENT_ORDER:
        return toPromise<U>(
          this.useCases.generatePaymentOrder(command.payload.request, command.payload.data)
        );

      case CommandType.REQUEST_SUBMISSION:
        return toPromise<U>(
          this.useCases.submitRequest(command.payload.request, {})
        );

      default:
          throw this.unhandledCommand(command);
    }
  }

}
