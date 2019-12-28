import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalRecordingDataComponent } from './physical-recording-data.component';

describe('PhysicalRecordingDataComponent', () => {
  let component: PhysicalRecordingDataComponent;
  let fixture: ComponentFixture<PhysicalRecordingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhysicalRecordingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhysicalRecordingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
