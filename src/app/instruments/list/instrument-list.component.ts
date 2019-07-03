/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

import { InstrumentService } from '@app/services/instrument.service';

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
  @Output() instrumentSelected = new EventEmitter<LegalInstrument>();

  hint = 'Ningún documento encontrado';
  filter = '';

  instrumentList: Observable<LegalInstrument[]> = of([]);
  selectedInstrument: LegalInstrument = {};

  displayCreateDocumentWizard = false;

  constructor(private instrumentService: InstrumentService) { }

  ngOnInit() {
    this.instrumentList = this.instrumentService.getInstruments();
  }


  isSelected(instrument: LegalInstrument) {
    return (this.selectedInstrument.uid === instrument.uid);
  }


  openCreateDocumentWizard() {
    this.displayCreateDocumentWizard = true;
  }


  closeCreateDocumentWizard() {
    this.displayCreateDocumentWizard = false;
  }

  onFilterChange() {

  }


  onInstrumentChange() {

  }

  onSelect(instrument: LegalInstrument) {
    this.selectedInstrument = instrument;
    this.instrumentSelected.emit(this.selectedInstrument);
  }

}
