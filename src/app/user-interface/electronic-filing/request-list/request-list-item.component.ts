/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { Request, PreventiveNote } from '@app/domain/models';


@Component({
  selector: 'emp-one-request-list-item',
  templateUrl: './request-list-item.component.html',
})
export class RequestListItemComponent {

  @Input() request: Request;


  get preventiveNote() {
    return (this.request as PreventiveNote);
  }

}
