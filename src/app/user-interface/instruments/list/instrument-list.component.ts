/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Assertion } from '@app/core';

import { InstrumentUseCases } from '@app/domain/use-cases';

import { LegalInstrument, EmptyLegalInstrument,
         LegalInstrumentFilter, LegalInstrumentStatus } from '@app/domain/models';

import { View } from '@app/user-interface/main-layout';


@Component({
  selector: 'emp-land-instrument-list',
  templateUrl: './instrument-list.component.html',
  styleUrls: [
    '../../../../styles/card.scss',
    '../../../../styles/list.scss'
  ]
})
export class InstrumentListComponent implements OnChanges {

  @Input() view: View;
  @Output() instrumentSelected = new EventEmitter<LegalInstrument>();

  hint = 'Ningún documento encontrado';
  keywords = '';

  instrumentList: Observable<LegalInstrument[]> = of([]);
  selectedInstrument: LegalInstrument = EmptyLegalInstrument;

  displayCreateDocumentWizard = false;

  constructor(private domain: InstrumentUseCases) { }


  ngOnChanges() {
    this.setFilter();
    this.instrumentList = this.domain.getInstruments();
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
    this.setFilter();
  }


  onSelect(instrument: LegalInstrument) {
    this.selectedInstrument = instrument;
    this.instrumentSelected.emit(this.selectedInstrument);
  }


  // private methods


  private buildFilter(): LegalInstrumentFilter {
    return { status: this.getStatusFilter(), keywords: this.keywords };
  }


  private getStatusFilter(): LegalInstrumentStatus {
    switch (this.view.name) {
      case 'Instruments.Pending':
        return 'Pending';
      case 'Instruments.Signed':
        return 'Signed';
      case 'Instruments.Requested':
        return 'Requested';
      case 'Instruments.All':
        return 'All';
      default:
        throw Assertion.assertNoReachThisCode();
    }
  }


  private setFilter() {
    const filter = this.buildFilter();

    this.domain.setFilter(filter);
  }

}
