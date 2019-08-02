/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Command, Assertion, CommandHandler, createCommand as createCommandAlias, CommandResult } from '@app/core';

import { PresentationState } from './presentation.state';

import { CommandType } from './commands';


export const COMMAND_HANDLERS =
                new InjectionToken<CommandHandler[]>('PresentationCommandHandlers');


@Injectable()
export class FrontController {

  private processing = false;

  constructor(@Inject(COMMAND_HANDLERS) private handlers: CommandHandler[],
              private presentation: PresentationState) { }


  get isProcessing() {
    return this.processing;
  }


  createCommand(type: CommandType, payload?: any): Command {
    return createCommandAlias(type, payload);
  }


  dispatch(command: Command): Promise<any>;


  dispatch(commandType: CommandType, payload?: any): Promise<any>;


  dispatch(command: Command | CommandType, payload?: any): Promise<any> {
    Assertion.assertValue(command, 'command');

    if (typeof command === 'string') {
      return this.dispatchImplementation(this.createCommand(command as CommandType, payload));
    } else {
      return this.dispatchImplementation(command);
    }
  }


  // private methods


  private afterCommandExecution(command: Command, result: any) {
    const commandResult: CommandResult = { ...command, result };

    this.presentation.applyEffects(commandResult);
    this.endProcessing();
  }


  private dispatchImplementation(command: Command): Promise<any> {
    if (this.isProcessing) {
      throw new Error('FrontController is processing a previous command. Please try again later.');
    }

    try {
      this.startProcessing();

      const commandHandler: CommandHandler = this.selectCommandHandler(command);

      return commandHandler.execute(command)
        .then(x => {
          this.afterCommandExecution(command, x);
          return x;

        }).catch(e =>
          this.whenCommandExecutionFails(command, e)

        );

    } catch (e) {
      this.endProcessing();
      throw e;
    }
  }


  private endProcessing(): void {
    this.processing = false;
    document.body.style.cursor = 'default';
  }


  private selectCommandHandler(command: Command): CommandHandler {
    for (const handler of this.handlers) {
      if (handler.commands.includes(command.type)) {
        return handler;
      }
    }
    throw Assertion.assertNoReachThisCode(`There is not defined a command handler for command type '${command.type}'.`);
  }


  private startProcessing(): void {
    this.processing = true;
    document.body.style.cursor = 'wait';
  }


  private whenCommandExecutionFails(command: Command, error: any) {
    this.endProcessing();

    console.log(`There was a problem executing command ${command.type} in FrontController.`, error);

    throw error;
  }

}
