/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ESignInputComponent } from './esign-input.component';


describe('EsignInputComponent', () => {
  let component: ESignInputComponent;
  let fixture: ComponentFixture<ESignInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ESignInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ESignInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
