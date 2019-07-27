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

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Assertion } from '@app/core';
import { CommandInvoker } from '@app/shared/services';

import { InstrumentUseCases, PropertyUseCases } from '@app/domain/use-cases';

import { EmptyRealEstate, PreventiveNote, PreventiveNoteRequest } from '@app/domain/models';


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


  constructor(private useCases: InstrumentUseCases,
              private propertyUseCases: PropertyUseCases,
              private commandInvoker: CommandInvoker) {
    this.commandInvoker.attachHandler(this);
  }


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
    this.updateRealEstateData();
  }


  onSave() {
    if (!this.preventiveNote.uid) {
      this.commandInvoker.execute('createPreventiveNote');
    } else {
      this.commandInvoker.execute('updatePreventiveNote');
    }
  }


  execute(commandName: string): Observable<any> {
    switch (commandName) {
      case 'createPreventiveNote':
        return this.createPreventiveNote();

      case 'updatePreventiveNote':
        return this.updatePreventiveNote();

      default:
        Assertion.assertNoReachThisCode(`Invalid requested command ${commandName}.`);
    }
  }


  // private members


  private createPreventiveNote(): Observable<PreventiveNote> {
    const data = this.getFormData();

    return this.useCases.createPreventiveNote(data)
      .pipe(
        tap(x => {
          this.preventiveNote = x;
          this.preventiveNoteChange.emit(this.preventiveNote);
        })
      );
  }


  private getFormData(): PreventiveNoteRequest {
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

    this.updateRealEstateData();

    if (this.readonly) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }


  private updatePreventiveNote(): Observable<PreventiveNote> {
    const data = this.getFormData();

    return this.useCases.updatePreventiveNote(this.preventiveNote, data)
      .pipe(
        tap(() => {
          this.resetForm();
          this.preventiveNoteChange.emit(this.preventiveNote);
        })
      );
  }


  private updateRealEstateData() {
    if (!this.form.value.propertyUID) {
      this.realEstate = EmptyRealEstate;
      return;
    }

    const propertyUID = this.form.value.propertyUID.toUpperCase();

    this.propertyUseCases.getRealEstate(propertyUID)
      .subscribe(
        x => this.realEstate = x,
        err => console.log('Display something with real estate not found error', JSON.stringify(err))
      );

  }

}
