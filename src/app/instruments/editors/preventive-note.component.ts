/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input,
         OnChanges, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';


enum FormMessages {

}


@Component({
  selector: 'emp-land-preventive-note',
  templateUrl: './preventive-note.component.html',
  styleUrls: ['./preventive-note.component.scss']
})
export class PreventiveNoteComponent implements OnInit, OnChanges {

  form = new FormGroup( {
    propertyUID: new FormControl('', Validators.required),
    projectedOperation: new FormControl('', Validators.required),
  });


  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.resetForm();
  }

  onSubmit(): void {

  }


  private resetForm() {
    this.form.reset({
      propertyUID: '',
      projectedOperation: ''
    });
  }

}
