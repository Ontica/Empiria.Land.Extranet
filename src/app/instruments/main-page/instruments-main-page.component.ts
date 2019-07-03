/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserInterfaceStore } from '@app/store/ui.store';

import { LegalInstrument } from '@app/models/registration';

import { View } from '@app/models/user-interface';


@Component({
  selector: 'emp-land-instruments-main-page',
  templateUrl: './instruments-main-page.component.html',
  styleUrls: ['./instruments-main-page.component.scss']
})
export class InstrumentsMainPageComponent implements OnInit, OnDestroy {

  displayEditor = false;
  toggleEditor = false;
  currentView: View;

  selectedInstrument: LegalInstrument = {};

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
    this.selectedInstrument = {};
    this.displayEditor = false;
  }


  // private methods


  private onChangeView(newView: View) {
    this.currentView = newView;
  }

}