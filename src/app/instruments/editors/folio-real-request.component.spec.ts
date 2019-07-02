/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolioRealRequestComponent } from './folio-real-request.component';


describe('FolioRealRequestComponent', () => {
  let component: FolioRealRequestComponent;
  let fixture: ComponentFixture<FolioRealRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolioRealRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolioRealRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
