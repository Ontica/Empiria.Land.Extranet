/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'emp-ng-esign-input',
  templateUrl: './esign-input.component.html'
})
export class ESignInputComponent {

  @Input() revokeMode = false;

  @Output() signTokenReceived = new EventEmitter<string>();

  esign = '';

  onSubmit() {
    const esignToken = this.esign;

    this.signTokenReceived.emit(esignToken);
  }

}
