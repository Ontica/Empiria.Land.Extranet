/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { EventInfo } from '@app/core';
import { FrontController } from '@app/core/presentation';

import { Request, EmptyRequest } from '@app/domain/models';


@Component({
  selector: 'emp-one-request-tab-view',
  templateUrl: './create-instrument-wizard.component.html',
  styleUrls: ['./create-instrument-wizard.component.scss']
})
export class RequestTabViewComponent {

  @Input() request: Request = EmptyRequest;

  @Output() closeEvent = new EventEmitter<void>();

  requestType = 'PreventiveNote';

  constructor(private frontController: FrontController) { }


  onClose() {
    this.closeEvent.emit();
  }


  processEvent(event: EventInfo) {
    this.frontController.dispatch<void>(event);
  }

}
