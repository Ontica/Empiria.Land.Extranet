/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Cryptography } from '@app/core/security/cryptography';


@Component({
  selector: 'emp-ng-esign-input',
  templateUrl: './esign-input.component.html',
  styleUrls: [
    '../../../../styles/general-styles.scss',
    '../../../../styles/form.scss'
  ]
})
export class ESignInputComponent {

  @Input() revokeMode = false;

  @Output() signTokenReceived = new EventEmitter<string>();

  esign = '';

  onSubmit() {
    const esignToken = this.esign;

    // const token = 'abracadabra';
    // const encrypted = Cryptography.encrypt(esignToken, token);
    // console.log('encrypted', encrypted);
    // const decrypted = Cryptography.decrypt(encrypted, token);
    // console.log('decrypted', decrypted);

    if (this.esign === 's3cur1ty') {
      this.signTokenReceived.emit(esignToken);
    } else {
      alert('No reconozco la firma electrónica proporcionada.');
      this.esign = '';
    }
  }

}
