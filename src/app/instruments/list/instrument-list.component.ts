/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, Input } from '@angular/core';
import { LegalInstrument } from '@app/models/registration';
import { View } from '@app/models/user-interface';


@Component({
  selector: 'emp-land-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: [
    '../../../styles/card.scss',
    '../../../styles/list.scss'
  ]
})
export class InstrumentListComponent implements OnInit {

  @Input() view: View;

  hint = 'Ningún documento encontrado';
  filter = '';

  instrumentList = [];

  displayCreateDocumentWizard = false;

  constructor() { }

  ngOnInit() {
  }


  isSelected(instrument: LegalInstrument) {

  }

  openCreateDocumentWizard() {
    this.displayCreateDocumentWizard = true;
  }


  closeCreateDocumentWizard() {
    this.displayCreateDocumentWizard = false;
  }

  onFilterChange() {

  }


  onSelect(instrument: LegalInstrument) {

  }

}
