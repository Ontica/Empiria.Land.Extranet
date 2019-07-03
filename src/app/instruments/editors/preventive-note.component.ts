/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input,
         OnChanges, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PropertyService } from '@app/services/property.service';
import { EmptyRealEstate, PreventiveNote } from '@app/models/registration';
import { InstrumentService } from '@app/services/instrument.service';
import { ReturnStatement } from '@angular/compiler';


enum FormMessages {

}


@Component({
  selector: 'emp-land-preventive-note',
  templateUrl: './preventive-note.component.html',
  styleUrls: ['./preventive-note.component.scss']
})
export class PreventiveNoteComponent implements OnInit, OnChanges {

  @Input() instrument: PreventiveNote;

  @Output() instrumentChange = new EventEmitter<PreventiveNote>();

  form = new FormGroup( {
    requestedBy: new FormControl('', Validators.required),
    propertyUID: new FormControl('', Validators.required),
    projectedOperation: new FormControl('', Validators.required),
  });

  realEstate = EmptyRealEstate;

  constructor(private instrumentService: InstrumentService,
              private propertyService: PropertyService) {

  }

  ngOnInit() {
    this.realEstate = EmptyRealEstate;
  }

  ngOnChanges() {
    this.resetForm();
    this.getPropertyData();
  }


  getPropertyData() {
    if (!this.form.value.propertyUID) {
      return;
    }
    this.propertyService.getRealEstate(this.form.value.propertyUID)
        .toPromise()
        .then(x => this.realEstate = x);
  }


  onSave() {
    if (!this.instrument.uid) {
      this.createInstrument();
    } else {
      this.updateInstrument();
    }
  }


  // private members


  private createInstrument() {
    const data = this.getFormData();

    this.instrumentService.createPreventiveNote(data)
      .toPromise()
      .then(x => {
        this.instrument = x;
        this.resetForm();
        this.instrumentChange.emit(this.instrument);
      });
  }


  private getFormData() {
    const formModel = this.form.value;

    const data = {
      requestedBy: formModel.requestedBy,
      propertyUID: this.realEstate.uid,
      projectedOperation: formModel.projectedOperation
    };

    return data;
  }


  private resetForm() {
    this.form.reset({
      requestedBy: this.instrument.requestedBy,
      propertyUID: this.instrument.property ? this.instrument.property.uid : '',
      projectedOperation: this.instrument.projectedOperation
    });
  }


  private updateInstrument() {
    const data = this.getFormData();

    this.instrumentService.updatePreventiveNote(this.instrument, data)
      .toPromise()
      .then(x => {
        this.instrument = x;
        this.instrumentChange.emit(this.instrument);
      });
  }

}
