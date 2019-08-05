/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { EventInfo } from '@app/core';

import { PresentationState } from '@app/core/presentation';

import { LegalInstrument, EmptyLegalInstrument,
         LegalInstrumentFilter, EmptyLegalInstrumentFilter } from '@app/domain/models';

import { InstrumentsStateAction } from '@app/core/presentation/state.commands';


export enum InstrumentListEventType {
  SET_FILTER                        = 'InstrumentListComponent.SetFilter',
  ON_CLICK_CREATE_INSTRUMENT_BUTTON = 'InstrumentListComponent.OnClickCreateInstrumentButton'
}


@Component({
  selector: 'emp-land-instrument-list',
  templateUrl: './instrument-list.component.html'
})
export class InstrumentListComponent implements OnChanges {

  @Input() instrumentList: LegalInstrument[] = [];

  @Input() selectedInstrument: LegalInstrument = EmptyLegalInstrument;

  @Input() filter: LegalInstrumentFilter = EmptyLegalInstrumentFilter;

  @Input() title: 'Documentos';

  @Output() instrumentListEvent = new EventEmitter<EventInfo>();

  keywords = '';


  constructor(private store: PresentationState) { }


  ngOnChanges(changes: SimpleChanges) {
    if (changes.filter) {
      this.keywords = this.filter.keywords;
    }
  }


  isSelected(instrument: LegalInstrument) {
    return (this.selectedInstrument.uid === instrument.uid);
  }


  onFilterChange() {
    this.setFilter();
  }


  onSelect(instrument: LegalInstrument) {
    this.store.dispatch(InstrumentsStateAction.SELECT_INSTRUMENT, { instrument });
  }


  onClickCreateInstrumentButton() {
    const event: EventInfo = {
      type: InstrumentListEventType.ON_CLICK_CREATE_INSTRUMENT_BUTTON
    };

    this.instrumentListEvent.emit(event);
  }


  // private methods


  private setFilter() {
    const event: EventInfo = {
      type: InstrumentListEventType.SET_FILTER,
      payload: { keywords: this.keywords }
    };

    this.instrumentListEvent.emit(event);
  }

}
