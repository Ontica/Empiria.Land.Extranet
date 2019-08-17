/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTabViewComponent } from './create-instrument-wizard.component';


describe('RequestTabViewComponent', () => {
  let component: RequestTabViewComponent;
  let fixture: ComponentFixture<RequestTabViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTabViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
