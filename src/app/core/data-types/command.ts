/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export interface Command {
  readonly type: string;
  payload?: any;
}


export function createCommand(type: string, payload?: any): Command {
  const command: Command = { type, payload };

  return command;
}


export abstract class CommandHandler {

  abstract types: string[];

  abstract execute(command: Command): Promise<any>;

}
