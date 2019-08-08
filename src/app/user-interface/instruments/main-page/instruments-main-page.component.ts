/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { isEmpty, Assertion, EventInfo } from '@app/core';

import { PresentationState } from '@app/core/presentation';
import { InstrumentStateSelector, InstrumentsStateAction,
         MainUIStateSelector } from '@app/core/presentation/state.commands';

import { LegalInstrument, EmptyLegalInstrument, LegalInstrumentStatus,
         LegalInstrumentFilter, EmptyLegalInstrumentFilter } from '@app/domain/models';

import { View } from '@app/user-interface/main-layout';

import { InstrumentListEventType } from '../list/instrument-list.component';


@Component({
  selector: 'emp-land-instruments-main-page',
  templateUrl: './instruments-main-page.component.html'
})
export class InstrumentsMainPageComponent implements OnInit, OnDestroy {

  displayEditor = false;
  currentView: View;

  instrumentList: LegalInstrument[] = [];
  selectedInstrument: LegalInstrument = EmptyLegalInstrument;
  filter: LegalInstrumentFilter = EmptyLegalInstrumentFilter;

  displayCreateInstrumentWizard = false;

  isLoading = false;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private store: PresentationState) { }


  ngOnInit() {
    this.store.select<LegalInstrument[]>(InstrumentStateSelector.INSTRUMENT_LIST)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x =>
        this.instrumentList = x
      );

    this.store.select<View>(MainUIStateSelector.CURRENT_VIEW)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x =>
        this.onChangeView(x)
      );

    this.store.select<LegalInstrument>(InstrumentStateSelector.SELECTED_INSTRUMENT)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        this.selectedInstrument = x;
        this.displayEditor = !isEmpty(this.selectedInstrument);
      });

    this.store.select<LegalInstrumentFilter>(InstrumentStateSelector.LIST_FILTER)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x =>
        this.filter = x
      );
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  onCloseEditor() {
    this.store.dispatch(InstrumentsStateAction.UNSELECT_INSTRUMENT);
  }


  onInstrumentListEvent(event: EventInfo): void {
    switch (event.type as InstrumentListEventType) {

      case InstrumentListEventType.SET_FILTER:
        this.loadInstruments(event.payload);
        return;

      case InstrumentListEventType.ON_CLICK_CREATE_INSTRUMENT_BUTTON:
        this.displayCreateInstrumentWizard = true;
        return;

      default:
        console.log(`Unhandled user interface event ${event.type}`);
        return;
    }
  }


  onCloseCreateInstrumentWizard() {
    this.displayCreateInstrumentWizard = false;
  }


  // private methods


  private onChangeView(newView: View) {
    this.currentView = newView;
    this.loadInstruments();
  }


  private getInstrumentStatusForView(view: View): LegalInstrumentStatus {
    switch (view.name) {
      case 'Instruments.Pending':
        return 'Pending';
      case 'Instruments.Signed':
        return 'Signed';
      case 'Instruments.Requested':
        return 'Requested';
      case 'Instruments.All':
        return 'All';
      default:
        throw Assertion.assertNoReachThisCode(`Unrecognized view with name '${view.name}'.`);
    }
  }


  private loadInstruments(data?: { keywords: string }) {
    const currentKeywords = this.store.getValue<LegalInstrumentFilter>(InstrumentStateSelector.LIST_FILTER).keywords;

    const filter = {
      status: this.getInstrumentStatusForView(this.currentView),
      keywords: data ? data.keywords : currentKeywords
    };

    this.isLoading = true;
    this.store.dispatch<any>(InstrumentsStateAction.SET_INSTRUMENT_FILTER, { filter })
      .then(() => this.isLoading = false);
  }

}
