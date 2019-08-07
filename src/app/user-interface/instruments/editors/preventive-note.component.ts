/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Assertion } from '@app/core';

import { FrontController, PresentationState } from '@app/core/presentation';

import { InstrumentCommandType } from '@app/core/presentation/commands';
import { RepositoryStateAction } from '@app/core/presentation/state.commands';

import { EmptyRealEstate, PreventiveNote, PreventiveNoteEditionData, RealEstate } from '@app/domain/models';


@Component({
  selector: 'emp-land-preventive-note',
  templateUrl: './preventive-note.component.html'
})
export class PreventiveNoteComponent implements OnInit, OnChanges {

  @Input() preventiveNote: PreventiveNote;

  realEstate = EmptyRealEstate;

  readonly = false;

  form = new FormGroup({
    requestedBy: new FormControl('', Validators.required),
    propertyUID: new FormControl('', Validators.required),
    projectedOperation: new FormControl('', Validators.required),
  });


  constructor(private frontController: FrontController,
              private store: PresentationState) { }


  get isReadyForSave() {
    return this.form.valid && !this.form.pristine && !this.readonly;
  }


  ngOnInit() {
    this.realEstate = EmptyRealEstate;
    this.readonly = false;
  }


  ngOnChanges() {
    this.readonly = this.preventiveNote.isSigned;
    this.resetForm();
  }


  onReadRealEstateData() {
    this.loadRealEstateData();
  }


  onSave() {
    if (!this.preventiveNote.uid) {
      this.createPreventiveNote();
    } else {
      this.updatePreventiveNote();
    }
  }


  // private members


  private createPreventiveNote() {
    const payload = {
      data: this.getFormData()
    };

    this.frontController.dispatch<PreventiveNote>(InstrumentCommandType.CREATE_PREVENTIVE_NOTE, payload)
      .then(x => this.preventiveNote = x);
  }


  private getFormData(): PreventiveNoteEditionData {
    Assertion.assert(this.form.valid,
      'Programming error: form must be validated before command execution.');

    const formModel = this.form.value;

    const data = {
      requestedBy: (formModel.requestedBy as string).toUpperCase(),
      propertyUID: this.realEstate.uid.toUpperCase(),
      projectedOperation: (formModel.projectedOperation as string).toUpperCase()
    };

    return data;
  }


  private resetForm() {
    this.form.reset({
      requestedBy: this.preventiveNote.requestedBy,
      propertyUID: this.preventiveNote.property ? this.preventiveNote.property.uid : '',
      projectedOperation: this.preventiveNote.projectedOperation
    });

    this.loadRealEstateData();

    if (this.readonly) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }


  private updatePreventiveNote() {
    const payload = {
      instrument: this.preventiveNote,
      data: this.getFormData()
    };

    this.frontController.dispatch(InstrumentCommandType.UPDATE_PREVENTIVE_NOTE, payload);
  }


  private loadRealEstateData() {
    if (!this.form.value.propertyUID) {
      this.realEstate = EmptyRealEstate;
      return;
    }

    const propertyUID = this.form.value.propertyUID.toUpperCase();

    this.store.dispatch<RealEstate>(RepositoryStateAction.LOAD_REAL_ESTATE, { uid: propertyUID })
      .then(x => this.realEstate = x)
      .catch(err => console.log('Display something with real estate not found error', JSON.stringify(err)));
  }

}
