/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Assertion, EventInfo } from '@app/core';

import { PresentationState } from '@app/core/presentation';
import { ElectronicFilingCommandType } from '@app/core/presentation/commands';
import { RepositoryStateAction } from '@app/core/presentation/state.commands';

import { EmptyRealEstate, PreventiveNote, PreventiveNoteEditionData, RealEstate } from '@app/domain/models';


@Component({
  selector: 'emp-land-preventive-note',
  templateUrl: './preventive-note.component.html'
})
export class PreventiveNoteComponent implements OnInit, OnChanges {

  @Input() preventiveNote: PreventiveNote;

  @Input() readonly = false;

  @Output() editionEvent = new EventEmitter<EventInfo>();

  realEstate = EmptyRealEstate;

  isLoading = false;

  form = new FormGroup({
    requestedBy: new FormControl('', Validators.required),
    propertyUID: new FormControl('', Validators.required),
    projectedOperation: new FormControl('', Validators.required),
  });

  constructor(private store: PresentationState) { }


  ngOnInit() {
    this.realEstate = EmptyRealEstate;
  }


  ngOnChanges() {
    this.resetForm();
  }


  get isReadyForSave() {
    return this.form.valid && !this.form.pristine && !this.readonly;
  }


  onReadRealEstateData() {
    this.loadRealEstateData();
  }


  onSave() {
    if (this.preventiveNote && this.preventiveNote.uid) {
      this.updatePreventiveNote();
    } else {
      this.createPreventiveNote();
    }
  }


  // private members


  private createPreventiveNote() {
    const event: EventInfo = {
      type: ElectronicFilingCommandType.CREATE_PREVENTIVE_NOTE,
      payload: {
        data: this.getFormData()
      }
    };

    this.editionEvent.emit(event);
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
    const event: EventInfo = {
      type: ElectronicFilingCommandType.UPDATE_PREVENTIVE_NOTE,
      payload: {
        request: this.preventiveNote,
        data: this.getFormData()
      }
    };

    this.editionEvent.emit(event);
  }


  private loadRealEstateData() {
    if (!this.form.value.propertyUID) {
      this.realEstate = EmptyRealEstate;
      return;
    }

    const propertyUID = this.form.value.propertyUID.toUpperCase();

    this.isLoading = true;
    this.store.dispatch<RealEstate>(RepositoryStateAction.LOAD_REAL_ESTATE, { uid: propertyUID })
        .then(x => {
          this.realEstate = x;
          this.isLoading = false;
       })
      .catch(err => console.log('Display something with real estate not found error', JSON.stringify(err)));
  }

}