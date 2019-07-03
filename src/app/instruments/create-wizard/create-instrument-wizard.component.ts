/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { LegalInstrument } from '@app/models/registration';


@Component({
  selector: 'emp-land-create-instrument-wizard',
  templateUrl: './create-instrument-wizard.component.html',
  styleUrls: ['./create-instrument-wizard.component.scss']
})
export class CreateInstrumentWizardComponent implements OnInit, OnChanges {

  @Input() instrument: LegalInstrument = {};
  @Input() showInstrumentTypeSelector = false;

  @Output() instrumentChange = new EventEmitter<LegalInstrument>();
  @Output() wizardClose = new EventEmitter<void>();

  documentType = '';

  constructor() { }

  ngOnInit() {
  }


  ngOnChanges() {
    if (!this.showInstrumentTypeSelector) {
      this.documentType = 'PreventiveNote';
    }
  }


  onClose() {
    this.wizardClose.emit();
  }

  onInstrumentChange(instrument: LegalInstrument) {
    this.instrument = instrument;
    this.instrumentChange.emit(this.instrument);
  }

}
