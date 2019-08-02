/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, CommandResult } from '@app/core';

import { StateHandler } from './state-handler';
import { StateAction, StateSelector } from './actions.and.selectors';


export const STATE_HANDLERS =
                new InjectionToken<StateHandler[]>('PresentationStateHandlers');


@Injectable()
export class PresentationState {

  constructor(@Inject(STATE_HANDLERS) private registeredHandlers: StateHandler[]) { }


  applyEffects(command: CommandResult): void {
    Assertion.assertValue(command, 'command');

    try {
      const stateHandler = this.tryGetStateHandlerForCommand(command);

      if (stateHandler) {
        stateHandler.applyEffects(command);
      }

    } catch (e) {
      throw e;
    }
  }


  getValue<T>(selector: StateSelector): T {
    Assertion.assertValue(selector, 'selector');

    const stateHandler = this.getStateHandlerForSelector(selector);

    return stateHandler.getValue<T>(selector);
  }


  dispatch<T>(actionType: StateAction, payload?: any): Promise<T> {
    Assertion.assertValue(actionType, 'actionType');
    Assertion.assertValue(payload, 'payload');

    const stateHandler = this.getStateHandlerForAction(actionType);

    return stateHandler.dispatch<T>(actionType, payload);
  }


  select<T>(selector: StateSelector): Observable<T> {
    Assertion.assertValue(selector, 'selector');

    const stateHandler = this.getStateHandlerForSelector(selector);

    return stateHandler.select<T>(selector);
  }


  // private methods


  private getStateHandlerForAction(actionType: string) {
    for (const handler of this.registeredHandlers) {
      if (handler.actions.includes(actionType)) {
        return handler;
      }
    }
    throw Assertion.assertNoReachThisCode(`There is not defined a presentation state handler for action '${actionType}'.`);
  }


  private getStateHandlerForSelector(selector: StateSelector): StateHandler {
    for (const handler of this.registeredHandlers) {
      if (handler.selectors.includes(selector)) {
        return handler;
      }
    }
    throw Assertion.assertNoReachThisCode(`There is not defined a presentation state handler for selector '${selector}'.`);
  }



  private tryGetStateHandlerForCommand(command: CommandResult): StateHandler | undefined {
    for (const handler of this.registeredHandlers) {
      if (handler.effects.includes(command.type)) {
        return handler;
      }
    }
    return undefined;
  }

}
