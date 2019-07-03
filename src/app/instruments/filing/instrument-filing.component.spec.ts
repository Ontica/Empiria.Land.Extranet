import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentFilingComponent } from './instrument-filing.component';

describe('InstrumentFilingComponent', () => {
  let component: InstrumentFilingComponent;
  let fixture: ComponentFixture<InstrumentFilingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentFilingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentFilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
