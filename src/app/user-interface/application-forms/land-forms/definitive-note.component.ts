/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Assertion, EventInfo } from '@app/core';

import { ElectronicFilingCommandType } from '@app/core/presentation/commands';

import { EFilingRequest, DefinitiveNote } from '@app/domain/models';


@Component({
  selector: 'emp-land-definitive-note',
  templateUrl: './definitive-note.component.html'
})
export class DefinitiveNoteComponent implements OnChanges {

  @Input() request: EFilingRequest;

  @Output() editionEvent = new EventEmitter<EventInfo>();

  exceptionMsg = '';

  isLoading = false;

  submitted = false;

  editionMode = false;

  form = new FormGroup({
    propertyUID: new FormControl('', Validators.required),
    operation: new FormControl('', Validators.required),
    grantors: new FormControl('', Validators.required),
    grantees: new FormControl('', Validators.required),
    observations: new FormControl(''),
  });


  ngOnChanges() {
    this.resetForm();
  }


  get canDelete() {
    return (this.editionMode && !this.readonly &&
           (!this.request.transaction || !this.request.transaction.uid));
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
    }
  }


  onDelete() {
    console.log('onDelete not Implemented');
  }


  onSubmit() {
    if (!this.isReadyForSave) {
      return;
    }

    this.submitted = true;

    this.setControlsValidation();

    this.validate();

    if (this.form.valid) {
      this.sendUpdateApplicationFormEvent();
      this.editionMode = false;
      this.form.disable();
    } else {
      console.log('propertyPick is valid', this.form.get('propertyUID').valid);
    }
  }


  onUpdateUI(control: string) {
    switch (control) {
      default:
        break;
    }
  }


  private setControlsValidation() {

  }


  // private members


  private getFormData(): DefinitiveNote {
    Assertion.assert(this.form.valid,
      'Programming error: form must be validated before command execution.');

    const formModel = this.form.value;

    const data = {
      propertyData: { propertyUID: formModel.propertyUID },
      operation: this.toUpperCase('operation'),
      grantors: this.toUpperCase('grantors'),
      grantees: this.toUpperCase('grantees'),
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
      return;
    }

    const appForm = this.request.form.fields as DefinitiveNote;

    this.form.reset({
      propertyUID: appForm.propertyData.propertyUID || '',
      operation: appForm.operation || '',
      grantors: appForm.grantors || '',
      grantees: appForm.grantees || '',
      observations: appForm.observations || ''
    });
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


  private validate() {

  }

}
