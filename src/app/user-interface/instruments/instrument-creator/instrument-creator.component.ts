/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Output, EventEmitter } from '@angular/core';

import { EventInfo } from '@app/core';
import { FrontController } from '@app/core/presentation';


@Component({
  selector: 'emp-land-instrument-creator',
  templateUrl: './instrument-creator.component.html',
  styleUrls: ['./instrument-creator.component.scss']
})
export class InstrumentCreatorComponent {

  @Output() closeEvent = new EventEmitter<void>();

  instrumentType = '';

  constructor(private frontController: FrontController) { }


  onClose() {
    this.closeEvent.emit();
  }


  processEvent(event: EventInfo) {
    this.frontController.dispatch<void>(event)
      .then(() => this.closeEvent.emit());
  }

}
