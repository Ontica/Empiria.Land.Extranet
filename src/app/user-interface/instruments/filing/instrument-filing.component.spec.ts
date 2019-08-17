import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSubmitterComponent } from './instrument-filing.component';

describe('RequestSubmitterComponent', () => {
  let component: RequestSubmitterComponent;
  let fixture: ComponentFixture<RequestSubmitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestSubmitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSubmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
