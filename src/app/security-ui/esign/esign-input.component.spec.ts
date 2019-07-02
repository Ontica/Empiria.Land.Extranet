import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsignInputComponent } from './esign-input.component';

describe('EsignInputComponent', () => {
  let component: EsignInputComponent;
  let fixture: ComponentFixture<EsignInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsignInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsignInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
