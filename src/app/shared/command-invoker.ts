/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion } from '@app/core';

import { MessageBoxService } from './message-box/message.box.service';


export interface CommandHandler {
  execute(commandName: string): Observable<any>;
}


@Injectable()
export class CommandInvoker {

  private processing = false;

  private commandHandler: CommandHandler;

  constructor(private msgBoxService: MessageBoxService) {
    this.processing = false;
  }


  get isProcessing() {
    return this.processing;
  }


  execute(commandName: string): void {
    if (this.processing) {
      return;
    }

    try {
      this.startProcessing();

      Assertion.assertValue(this.commandHandler,
        'attachHandler() method must be called before execution.');

      this.commandHandler.execute(commandName)
        .subscribe(
          () => this.endProcessing(),
          err => {
            this.msgBoxService.showError(err);
            this.endProcessing();
          });

    } catch (e) {
      this.msgBoxService.showError(e);
      this.endProcessing();
    }
  }


  attachHandler(handler: CommandHandler) {
    this.commandHandler = handler;
  }

  // private methods


  private endProcessing(): void {
    this.processing = false;
    document.body.style.cursor = 'default';
  }


  private startProcessing(): void {
    this.processing = true;
    document.body.style.cursor = 'wait';
  }

}
