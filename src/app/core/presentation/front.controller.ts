/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Command, Assertion, CommandHandler, createCommand as createCommandAlias } from '@app/core';

import { PresentationState } from './presentation.state';


export const COMMAND_HANDLERS =
                new InjectionToken<CommandHandler[]>('PresentationCommandHandlers');


@Injectable()
export class FrontController {

  constructor(private presentation: PresentationState,
              @Inject(COMMAND_HANDLERS) private handlers: CommandHandler[]) { }


  createCommand(type: string, payload?: any): Command {
    return createCommandAlias(type, payload);
  }


  dispatch(command: Command): Promise<any> {
    Assertion.assertValue(command, 'command');

    const commandHandler: CommandHandler = this.selectCommandHandler(command);

    const promise = commandHandler.execute(command);

    promise.then(() => this.presentation.dispatch(command));

    return promise;
  }


  private selectCommandHandler(command: Command): CommandHandler {
    for (const handler of this.handlers) {
      if (handler.types.includes(command.type)) {
        return handler;
      }
    }
    throw Assertion.assertNoReachThisCode(`There is not defined a command handler for command type '${command.type}'.`);
  }

}
