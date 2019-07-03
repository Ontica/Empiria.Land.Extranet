import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentSignRequestComponent } from './instrument-sign-request.component';

describe('InstrumentSignRequestComponent', () => {
  let component: InstrumentSignRequestComponent;
  let fixture: ComponentFixture<InstrumentSignRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentSignRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentSignRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
