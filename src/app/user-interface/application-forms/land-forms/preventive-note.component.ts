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

import { EmptyRealEstate, PreventiveNote, RealEstate, EFilingRequest } from '@app/domain/models';


@Component({
  selector: 'emp-land-preventive-note',
  templateUrl: './preventive-note.component.html'
})
export class PreventiveNoteComponent implements OnInit, OnChanges {

  @Input() request: EFilingRequest;

  @Output() editionEvent = new EventEmitter<EventInfo>();

  realEstate = EmptyRealEstate;

  isLoading = false;


  form = new FormGroup({
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


  get readonly() {
    return this.request.esign && this.request.esign.sign;
  }


  get isReadyForSave() {
    return this.form.valid && !this.form.pristine && !this.readonly;
  }


  onReadRealEstateData() {
    this.loadRealEstateData();
  }


  onSave() {
    this.sendUpdateApplicationFormEvent();
  }


  // private members


  private getFormData(): PreventiveNote {
    Assertion.assert(this.form.valid,
         'Programming error: form must be validated before command execution.');

    const formModel = this.form.value;

    const data = {
      propertyUID: this.realEstate.uid.toUpperCase(),
      projectedOperation: (formModel.projectedOperation as string).toUpperCase()
    };

    return data;
  }


  private resetForm() {
    if (!this.request.form) {
      this.form.reset();
      this.realEstate = EmptyRealEstate;
      this.form.enable();
      return;
    }

    const appForm = this.request.form.fields as PreventiveNote;

    this.form.reset({
      propertyUID: appForm.propertyUID || '',
      projectedOperation: appForm.projectedOperation || ''
    });

    this.loadRealEstateData();

    if (this.readonly) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }


  private sendUpdateApplicationFormEvent() {
    const event: EventInfo = {
      type: ElectronicFilingCommandType.UPDATE_APPLICATION_FORM,
      payload: {
        request: this.request,
        form: this.getFormData()
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
      .catch(err => {
        this.isLoading = false;
        alert('No existe ningún predio con el folio real proporcionado.');
      });
  }

}
