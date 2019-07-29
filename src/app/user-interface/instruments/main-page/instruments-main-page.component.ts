/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserInterfaceStore } from '@app/store/ui.store';

import { LegalInstrument, EmptyLegalInstrument } from '@app/domain/models';

import { View } from '@app/user-interface/main-layout';


@Component({
  selector: 'emp-land-instruments-main-page',
  templateUrl: './instruments-main-page.component.html',
  styleUrls: ['../../../../styles/explorer.scss']
})
export class InstrumentsMainPageComponent implements OnInit, OnDestroy {

  displayEditor = false;
  toggleEditor = false;
  currentView: View;

  selectedInstrument: LegalInstrument = EmptyLegalInstrument;

  private subs1: Subscription;


  constructor(private uiStore: UserInterfaceStore) { }


  ngOnInit() {
    this.subs1 = this.uiStore.currentView.subscribe(
      x => this.onChangeView(x)
    );
  }


  ngOnDestroy() {
    if (this.subs1) {
      this.subs1.unsubscribe();
    }
  }


  onSelectInstrument(instrument: LegalInstrument) {
    this.selectedInstrument = instrument;
    this.displayEditor = true;
  }


  onEditorClose() {
    this.selectedInstrument = EmptyLegalInstrument;
    this.displayEditor = false;
  }


  // private methods


  private onChangeView(newView: View) {
    this.currentView = newView;
  }

}
