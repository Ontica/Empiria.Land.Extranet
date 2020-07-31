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

import { EFilingRequest, AvisoTestamentario } from '@app/domain/models';


@Component({
  selector: 'emp-land-aviso-testamentario',
  templateUrl: './aviso-testamentario.component.html'
})
export class AvisoTestamentarioComponent implements OnChanges {

  @Input() request: EFilingRequest;

  @Output() editionEvent = new EventEmitter<EventInfo>();

  exceptionMsg = '';

  isLoading = false;

  submitted = false;

  editionMode = false;

  form = new FormGroup({
    text: new FormControl('', Validators.required),
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

    this.validate();

    if (this.form.valid) {
      this.sendUpdateApplicationFormEvent();
      this.editionMode = false;
      this.form.disable();
    } else {
      console.log('Invalid form data');
    }
  }


  onUpdateUI(control: string) {
    switch (control) {
      default:
        break;
    }
  }

  // private members


  private getFormData(): AvisoTestamentario {
    Assertion.assert(this.form.valid,
      'Programming error: form must be validated before command execution.');

    const formModel = this.form.value;

    const data = {
      text: this.toUpperCase('text'),
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

    const appForm = this.request.form.fields as AvisoTestamentario;

    this.form.reset({
      text: appForm.text || '',
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
