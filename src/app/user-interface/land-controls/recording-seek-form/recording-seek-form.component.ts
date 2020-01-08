/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit, OnDestroy,
         Output, EventEmitter, forwardRef } from '@angular/core';

import {
  AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
  Validator, ValidationErrors, FormGroup, FormControl, Validators
} from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Identifiable, Assertion } from '@app/core';
import { PresentationState } from '@app/core/presentation';

import { EmptyRealEstate, RecordingSeekData } from '@app/domain/models';

import { LandRepositoryStateSelector } from '@app/core/presentation/state.commands';


@Component({
  selector: 'emp-land-recording-seek-form',
  templateUrl: './recording-seek-form.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RecordingSeekFormComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => RecordingSeekFormComponent), multi: true }
  ]
})
export class RecordingSeekFormComponent implements ControlValueAccessor, OnInit, OnDestroy, Validator {

  @Input() disabled = false;

  @Output() propertySearch = new EventEmitter<RecordingSeekData>();

  form = new FormGroup({
    districtUID: new FormControl('', Validators.required),
    municipalityUID: new FormControl('', Validators.required),
    recordingBookUID: new FormControl('', Validators.required),
    recordingNo: new FormControl('', Validators.required),
    recordingFraction: new FormControl(''),
    cadastralKey: new FormControl(''),
    propertyType: new FormControl('', Validators.required),
    propertyName: new FormControl(''),
    location: new FormControl(''),
    searchNotes: new FormControl('')
  });

  districtList: Identifiable[] = [];
  municipalityList: Identifiable[] = [];
  recordingBookList: Identifiable[] = [];
  realEstateTypeList: Identifiable[] = [];

  realEstate = EmptyRealEstate;

  errorMsg = '';

  isLoading = false;

  private unsubscribe: Subject<void> = new Subject();

  onChange = (data: RecordingSeekData) => { };

  onTouched = () => { };

  onValidate = () => { };

  constructor(private store: PresentationState) { }


  ngOnInit() {
    this.initialLoad();
    this.form.valueChanges.subscribe(
      () => this.onFormControlChanges()
    );
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  onChangeDistrict(districtUID: string) {
    this.loadDistrictData(districtUID);
  }


  registerOnChange(fn: (data: RecordingSeekData) => void): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


  registerOnValidatorChange?(fn: () => void): void {
    this.onValidate = fn;
  }


  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;

    if (this.disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }


  validate(control: AbstractControl): ValidationErrors | null {
    if (this.form.disabled || this.form.valid) {
      return null;
    } else {
      return { valid: false };
    }
  }


  writeValue(data: RecordingSeekData): void {
    if (!data) {
      this.setFormData(null);
      return;
    }
    if (data.districtUID) {
      this.loadDistrictData(data.districtUID);
    }
    this.setFormData(data);
  }


  // private methods

  public get isDirty() {
    return this.form.dirty;
  }


  private initialLoad() {
    this.store.select<Identifiable[]>(LandRepositoryStateSelector.DISTRICT_LIST)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        this.districtList = x;
        this.isLoading = false;
      });


    this.store.select<Identifiable[]>(LandRepositoryStateSelector.REAL_ESTATE_TYPE_LIST)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        this.realEstateTypeList = x;
        this.isLoading = false;
      });
  }


  private loadDistrictData(districtUID: string) {
    this.isLoading = true;

    if (!districtUID) {
      this.form.get('districtUID').setValue('');
      this.form.get('municipalityUID').setValue('');
      this.form.get('recordingBookUID').setValue('');
      this.onTouched();
      console.log('!discti', this.form.value);
    }

    this.loadMunicipalityList(districtUID);
    this.loadRecordingBooksList(districtUID);
  }


  private loadMunicipalityList(districtUID: string) {
    this.isLoading = true;

    if (!districtUID) {
      this.municipalityList = [];
      this.isLoading = false;
      return;
    }

    this.store.select<Identifiable[]>(LandRepositoryStateSelector.DISTRICT_MUNICIPALITY_LIST, { districtUID })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        this.municipalityList = x;
        this.isLoading = false;
      });
  }


  private loadRecordingBooksList(districtUID: string) {
    this.isLoading = true;

    if (!districtUID) {
      this.recordingBookList = [];
      this.isLoading = false;
      return;
    }

    this.store.select<Identifiable[]>(LandRepositoryStateSelector.DISTRICT_DOMAIN_RECORDING_BOOKS_LIST, { districtUID })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        this.recordingBookList = x;
        this.isLoading = false;
      });
  }


  private onFormControlChanges() {
    this.onTouched();

    if (!this.propagateChanges()) {
      return;
    }

    const propertySearchData = this.getFormData();

    this.propertySearch.emit(propertySearchData);
    this.onChange(propertySearchData);
  }


  private setFormData(data: RecordingSeekData) {
    if (!data) {
      this.form.reset();
      return;
    }

    this.form.reset({
      districtUID: data.districtUID || '',
      municipalityUID: data.municipalityUID || '',
      recordingBookUID: data.recordingBookUID || '',
      recordingNo: data.recordingNo || '',
      recordingFraction: data.recordingFraction || '',
      cadastralKey: data.cadastralKey || '',
      propertyType: data.propertyType || '',
      propertyName: data.propertyName || '',
      location: data.location || '',
      searchNotes: data.searchNotes
    });
  }


  private getFormData(): RecordingSeekData {
    Assertion.assert(this.form.valid,
      'Programming error: form must be validated before command execution.');

    const formModel = this.form.value;

    const data = {
      districtUID: formModel.districtUID,
      municipalityUID: formModel.municipalityUID,
      recordingBookUID: formModel.recordingBookUID,
      recordingNo: this.toUpperCase('recordingNo'),
      recordingFraction: this.toUpperCase('recordingFraction'),
      cadastralKey: this.toUpperCase('cadastralKey'),
      propertyType: formModel.propertyType,
      propertyName: this.toUpperCase('propertyName'),
      location: this.toUpperCase('location'),
      searchNotes: this.toUpperCase('searchNotes'),
    };

    return data;
  }


  private propagateChanges() {
    return this.form.valid && this.form.dirty;
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

}
