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

  exceptionMsg = '';

  realEstate = EmptyRealEstate;

  isLoading = false;

  submitted = false;

  editionMode = false;

  form = new FormGroup({
    propertyUID: new FormControl('', Validators.required),
    projectedOperation: new FormControl('', Validators.required),
    grantors: new FormControl('', Validators.required),
    grantees: new FormControl('', Validators.required),
    createPartition: new FormControl('', Validators.required),
    partitionName: new FormControl({value: '', disabled: true}),
    observations: new FormControl(''),
  });


  constructor(private store: PresentationState) { }


  ngOnInit() {
    this.realEstate = EmptyRealEstate;
  }


  ngOnChanges() {
    this.resetForm();
  }


  get canDelete() {
    return (this.editionMode && !this.readonly  && (!this.request.transaction || !this.request.transaction.uid));
  }


  get canEdit() {
    return (!this.editionMode && !this.readonly);
  }


  get readonly() {
    return (this.request.esign && this.request.esign.sign);
  }


  get isReadyForSave() {
    return (!this.form.pristine && !this.readonly);
  }


  onCancel() {
    this.resetForm();
  }


  onEdit() {
    if (!this.readonly) {
      this.editionMode = true;
      this.form.enable();
      this.onUpdateUI('createPartition');
    }
  }


  onDelete() {
    console.log('onDelete not Implemented');
  }


  onReadRealEstateData() {
    this.loadRealEstateData();
  }


  onSubmit() {
    if (!this.isReadyForSave) {
      return;
    }

    this.submitted = true;
    this.validate();

    if (this.form.valid) {
      this.sendUpdateApplicationFormEvent();
      this.editionMode = false;
      this.form.disable();
    }
  }


  onUpdateUI(control: string) {
    switch (control) {
      case 'createPartition':
        this.updateCreatePartitionUI();
        break;
    }

  }

  // private members


  private getFormData(): PreventiveNote {
    Assertion.assert(this.form.valid,
         'Programming error: form must be validated before command execution.');

    const formModel = this.form.value;

    const data = {
      propertyUID: this.realEstate.uid.toUpperCase(),
      projectedOperation: this.toUpperCase('projectedOperation'),
      grantors: this.toUpperCase('grantors'),
      grantees: this.toUpperCase('grantees'),
      createPartition: formModel.createPartition === 'true' ? true : false,
      partitionName: this.toUpperCase('partitionName'),
      observations: this.toUpperCase('observations')
    };

    return data;
  }


  private resetForm() {
    this.editionMode = false;
    this.submitted = false;
    this.exceptionMsg = '';
    this.form.disable();

    if (!this.request.form) {
      this.form.reset();
      this.realEstate = EmptyRealEstate;
      return;
    }

    const appForm = this.request.form.fields as PreventiveNote;

    this.form.reset({
      propertyUID: appForm.propertyUID || '',
      projectedOperation: appForm.projectedOperation || '',
      grantors: appForm.grantors || '',
      grantees: appForm.grantees || '',
      createPartition: appForm.createPartition !== null ? appForm.createPartition : '',
      partitionName: appForm.partitionName || '',
      observations: appForm.observations || ''
    });

    this.loadRealEstateData();
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


  private setControlAsRequired(controlName: string, noValidMessage?: string) {
    const control = this.form.get(controlName);

    if (control.value === '' || control.value === 'null') {
      control.setErrors({ required: true });
      this.exceptionMsg = noValidMessage ? noValidMessage : '';
      // control.markAsDirty();
    }
  }

  private setControlAsOptional(controlName: string) {
    const control = this.form.get(controlName);

    control.setErrors(null);
  }


  private toUpperCase(controlName: string) {
    const control = this.form.get(controlName);

    if (!control) {
      console.log('Invalid control name', controlName);
      return '';
    }

    if (control.value) {
      return (control.value as string).toUpperCase();
    } else {
      return '';
    }
  }


  private updateCreatePartitionUI() {
    const createPartition = this.form.get('createPartition');
    const partitionName = this.form.get('partitionName');

    if (createPartition.value === null) {
      createPartition.setValue('');
    }

    if (createPartition.value === 'true' || createPartition.value === true) {
      partitionName.enable();
    } else {
      partitionName.disable();
      partitionName.setValue('');
    }
  }


  private validate() {
    this.validatePartition();
  }


  private validatePartition() {
    const createPartition = this.form.get('createPartition');

    if (createPartition.value === 'true') {
      this.setControlAsRequired('partitionName', 'Requiero se proporcione el nombre de la fracción.');
    } else {
      this.setControlAsOptional('partitionName');
    }
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
