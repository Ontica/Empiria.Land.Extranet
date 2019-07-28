/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Assertion } from '@app/core';
import { FrontController } from '@app/core/presentation';

import { PropertyUseCases } from '@app/domain/use-cases';

import { EmptyRealEstate, PreventiveNote, PreventiveNoteEditionData } from '@app/domain/models';


@Component({
  selector: 'emp-land-preventive-note',
  templateUrl: './preventive-note.component.html',
  styleUrls: [
    '../../../../styles/general-styles.scss',
    '../../../../styles/form.scss'
  ]
})
export class PreventiveNoteComponent implements OnInit, OnChanges {

  @Input() preventiveNote: PreventiveNote;

  @Output() preventiveNoteChange = new EventEmitter<PreventiveNote>();

  realEstate = EmptyRealEstate;

  readonly = false;

  form = new FormGroup({
    requestedBy: new FormControl('', Validators.required),
    propertyUID: new FormControl('', Validators.required),
    projectedOperation: new FormControl('', Validators.required),
  });


  constructor(private frontController: FrontController,
              private propertyUseCases: PropertyUseCases) { }


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

    const action = this.frontController.createAction('LAND.PREVENTIVE.NOTE.CREATE', payload);

    this.frontController.dispatch(action)
      .then(x => {
        this.preventiveNote = x;
        this.preventiveNoteChange.emit(this.preventiveNote);
      });
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

    const action = this.frontController.createAction('LAND.PREVENTIVE.NOTE.UPDATE', payload);

    this.frontController.dispatch(action)
      .then(x => {
        this.resetForm();
        this.preventiveNoteChange.emit(this.preventiveNote);
      });
  }


  private loadRealEstateData() {
    if (!this.form.value.propertyUID) {
      this.realEstate = EmptyRealEstate;
      return;
    }

    const propertyUID = this.form.value.propertyUID.toUpperCase();

    this.propertyUseCases.getRealEstate(propertyUID)
      .subscribe(
        x => this.realEstate = x,
        err => console.log('Display something when real estate not found error', JSON.stringify(err))
      );

  }

}
