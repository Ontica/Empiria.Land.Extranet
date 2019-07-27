/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input } from '@angular/core';

import { LegalInstrument, PreventiveNote } from '@app/domain/models';


@Component({
  selector: 'emp-land-instrument-list-item',
  templateUrl: './instrument-list-item.component.html',
})
export class InstrumentListItemComponent {

  @Input() instrument: LegalInstrument;


  get preventiveNote() {
    return (this.instrument as PreventiveNote);
  }

}
