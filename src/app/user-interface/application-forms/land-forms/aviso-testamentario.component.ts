/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EventInfo } from '@app/core';

import { EFilingRequest, AvisoTestamentario } from '@app/domain/models';

import { ApplicationFormComponent, ApplicationFormHandler } from './common/application-form-handler';


@Component({
  selector: 'emp-land-aviso-testamentario',
  templateUrl: './aviso-testamentario.component.html'
})
export class AvisoTestamentarioComponent implements ApplicationFormComponent, OnChanges{

  @Input() request: EFilingRequest;

  @Output() editionEvent = new EventEmitter<EventInfo>();

  form = new FormGroup({
    text: new FormControl('', Validators.required),
    observations: new FormControl(''),
  });

  formHandler: ApplicationFormHandler;


  constructor() {
    this.formHandler = new ApplicationFormHandler(this);
  }


  ngOnChanges() {
    this.resetForm();
  }


  onFileControlEvent(file: File) {
    console.log('file', file);
  }


  getFormData(): AvisoTestamentario {
    const formModel = this.form.value;

    const data = {
      text: this.formHandler.toUpperCase('text'),
      observations: this.formHandler.toUpperCase('observations')
    };

    return data;
  }


  resetForm() {
    this.formHandler.clearForm();

    if (!this.request.form) {
      return;
    }

    const appForm = this.request.form.fields as AvisoTestamentario;

    this.form.reset({
      text: appForm.text || '',
      observations: appForm.observations || ''
    });
  }

}
