/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Directive, ElementRef } from '@angular/core';


@Directive({
  selector: '[empNgSpinnerHost]'
})
export class SpinnerHostDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.position = 'relative';
  }

}
