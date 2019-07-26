/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Inject, Injectable, InjectionToken } from '@angular/core';

import { Action, Assertion, CommandHandler, createAction as createActionAlias } from '@app/core';

import { PresentationState } from './presentation.state';


export const COMMAND_HANDLERS =
                new InjectionToken<CommandHandler[]>('PresentationCommandHandlers');


@Injectable()
export class FrontController {

  constructor(private presentation: PresentationState,
              @Inject(COMMAND_HANDLERS) private handlers: CommandHandler[]) { }


  createAction(type: string, payload?: any): Action {
    return createActionAlias(type, payload);
  }


  dispatch(action: Action): Promise<any> {
    Assertion.assertValue(action, 'action');

    const commandHandler: CommandHandler = this.selectActionCommandHandler(action);

    const promise = commandHandler.execute(action);

    promise.then(() => this.presentation.dispatch(action));

    return promise;
  }


  private selectActionCommandHandler(action: Action): CommandHandler {
    for (const handler of this.handlers) {
      if (handler.types.includes(action.type)) {
        return handler;
      }
    }
    throw Assertion.assertNoReachThisCode();
  }

}
