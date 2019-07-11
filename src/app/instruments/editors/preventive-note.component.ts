/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import {
  Component, EventEmitter, Input,
  OnChanges, OnInit, Output
} from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InstrumentStore } from '@app/store';

import { EmptyRealEstate, PreventiveNote, PreventiveNoteRequest } from '@app/models/registration';
import { MessageBoxService } from '@app/shared/services';


@Component({
  selector: 'emp-land-preventive-note',
  templateUrl: './preventive-note.component.html',
  styleUrls: [
    '../../../styles/general-styles.scss',
    '../../../styles/form.scss'
  ]
})
export class PreventiveNoteComponent implements OnInit, OnChanges {

  @Input() preventiveNote: PreventiveNote;

  @Output() preventiveNoteChange = new EventEmitter<PreventiveNote>();

  readonly = false;

  form = new FormGroup({
    requestedBy: new FormControl('', Validators.required),
    propertyUID: new FormControl('', Validators.required),
    projectedOperation: new FormControl('', Validators.required),
  });


  realEstate = EmptyRealEstate;

  constructor(private store: InstrumentStore,
              private msgBoxService: MessageBoxService) {

  }


  ngOnInit() {
    this.realEstate = EmptyRealEstate;
  }


  ngOnChanges() {
    this.readonly = this.preventiveNote.isSigned;
    this.resetForm();
    this.getRealEstateData();
  }


  onReadRealEstateData() {
    this.getRealEstateData();
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
    const data = this.getFormData();

    this.store.createPreventiveNote(data)
      .then(x => {
        this.preventiveNote = x;
        this.resetForm();
        this.preventiveNoteChange.emit(this.preventiveNote);
      });
  }


  private getFormData(): PreventiveNoteRequest {
    const formModel = this.form.value;

    const data = {
      requestedBy: (formModel.requestedBy as string).toUpperCase(),
      propertyUID: this.realEstate.uid.toUpperCase(),
      projectedOperation: (formModel.projectedOperation as string).toUpperCase()
    };

    return data;
  }


  private getRealEstateData() {
    if (!this.form.value.propertyUID) {
      return;
    }
    this.store.getRealEstate(this.form.value.propertyUID)
      .then(x => this.realEstate = x)
      .catch(e => this.msgBoxService.showError(e));
  }


  private resetForm() {
    this.form.reset({
      requestedBy: this.preventiveNote.requestedBy,
      propertyUID: this.preventiveNote.property ? this.preventiveNote.property.uid : '',
      projectedOperation: this.preventiveNote.projectedOperation
    });

    if (this.readonly) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }


  private updatePreventiveNote() {
    const data = this.getFormData();

    this.store.updatePreventiveNote(this.preventiveNote, data)
      .then(() => {
        this.resetForm();
        this.preventiveNoteChange.emit(this.preventiveNote);
      });
  }

}
