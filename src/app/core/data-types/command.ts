/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export interface Action {
  readonly type: string;
  payload?: any;
}


export function createAction(type: string, payload?: any): Action {
  const action: Action = { type, payload };

  return action;
}


export abstract class CommandHandler {

  abstract types: string[];

  abstract execute(action: Action): Promise<any>;

}
