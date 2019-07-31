/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Assertion } from '@app/core';

import { PresentationState } from '@app/core/presentation';

import { LegalInstrument, EmptyLegalInstrument, LegalInstrumentStatus } from '@app/domain/models';

import { View } from '@app/user-interface/main-layout';

import { InstrumentsStateHandler, SelectorType, ActionType } from '@app/integration/state.handlers/instruments.state.handler';


@Component({
  selector: 'emp-land-instrument-list',
  templateUrl: './instrument-list.component.html'
})
export class InstrumentListComponent implements OnInit, OnChanges {

  @Input() view: View;

  @Output() instrumentSelected = new EventEmitter<LegalInstrument>();

  hint = 'Ningún documento encontrado';
  keywords = '';

  instrumentList = of<LegalInstrument[]>([]);
  selectedInstrument = EmptyLegalInstrument;

  displayCreateDocumentWizard = false;

  constructor(private store: PresentationState) { }


  ngOnInit() {
    console.log('ngOnInit');

    this.instrumentList = this.store.select<LegalInstrument[]>(SelectorType.INSTRUMENT_LIST)
      .pipe(
        tap(x => {
          if (this.selectedInstrument.uid) {
            const newSelected = x.find(item => item.uid === this.selectedInstrument.uid);
            if (newSelected) {
              this.onSelect(newSelected);
            }
          }
          this.hint = `${x.length} documentos encontrados`;

          console.log('filter', x.length, this.store.getValue(SelectorType.LIST_FILTER));
        })
      );
  }


  ngOnChanges() {
    console.log('ngOnChanges');
    this.setFilter();
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


  private getInstrumentStatusForSelectedView(): LegalInstrumentStatus {
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
        throw Assertion.assertNoReachThisCode(`Unrecognized view with name '${this.view.name}'.`);
    }
  }


  private setFilter() {
    const filter = {
      status: this.getInstrumentStatusForSelectedView(),
      keywords: this.keywords
    };

    this.store.dispatch(ActionType.SET_INSTRUMENT_FILTER, { filter });
  }

}
