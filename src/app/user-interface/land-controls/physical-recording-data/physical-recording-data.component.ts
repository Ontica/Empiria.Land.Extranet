/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, forwardRef } from '@angular/core';

import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS,
         Validator, ValidationErrors, FormGroup, FormControl, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Identifiable } from '@app/core';
import { PresentationState } from '@app/core/presentation';

import { EmptyRealEstate, RealEstate } from '@app/domain/models';

import { RepositoryStateAction, LandRepositoryStateSelector } from '@app/core/presentation/state.commands';


@Component({
  selector: 'emp-land-physical-recording-data',
  templateUrl: './physical-recording-data.component.html',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PhysicalRecordingDataComponent), multi: true },
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => PhysicalRecordingDataComponent), multi: true }
  ]
})
export class PhysicalRecordingDataComponent implements ControlValueAccessor, OnInit, OnDestroy, Validator {

  @Input() disabled = false;

  @Output() selectRealEstate = new EventEmitter<RealEstate>();

  form = new FormGroup({
    districtUID: new FormControl('', Validators.required),
    municipalityUID: new FormControl('', Validators.required),
    recordingBookUID: new FormControl('', Validators.required),
    recordingNo: new FormControl('', Validators.required),
    recordingFraction: new FormControl(''),
    cadastralKey: new FormControl(''),
    realEstateType: new FormControl('', Validators.required),
    realEstateName: new FormControl(''),
    realEstateLocation: new FormControl(''),
    realEstateNotes: new FormControl(''),
    propertyUID: new FormControl('', Validators.required)
  });

  districtList: Identifiable[] = [];
  municipalityList: Identifiable[] = [];
  recordingBookList: Identifiable[] = [];
  realEstateTypeList: Identifiable[] = [];

  realEstate = EmptyRealEstate;

  errorMsg = '';

  isLoading = false;

  private unsubscribe: Subject<void> = new Subject();

  onChange = (propertyUID: string) => {};

  onTouched = () => {};

  onValidate = () => {};

  constructor(private store: PresentationState) {}


  ngOnInit() {
    this.initialLoad();
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  onChangeDistrict(districtUID: string) {
    this.loadDistrictData(districtUID);
  }


  registerOnChange(fn: (propertyUID: string) => void): void {
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
    if (this.form.disabled || (this.form.valid && !this.isDirty)) {
      return null;
    } else {
      return { valid: false };
    }
  }


  writeValue(propertyUID: string): void {
    if (propertyUID == null) {
      propertyUID = '';
    }

    if (typeof propertyUID !== 'string') {
      return;
    }

    // this.form.get('propertyUID').setValue(propertyUID, { emitEvent : false });

    // this.loadRealEstateData(propertyUID);
  }


  touch() {

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

    this.store.select<Identifiable[]>(LandRepositoryStateSelector.DISTRICT_MUNICIPALITY_LIST,
                                     { districtUID })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        this.municipalityList = x;
        this.isLoading = false;
    });

    this.store.select<Identifiable[]>(LandRepositoryStateSelector.DISTRICT_DOMAIN_RECORDING_BOOKS_LIST,
                                      { districtUID })
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(x => {
        this.recordingBookList = x;
        this.isLoading = false;
    });
  }

}
