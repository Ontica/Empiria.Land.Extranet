import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstatePickerComponent } from './real-estate-picker.component';

describe('RealEstatePickerComponent', () => {
  let component: RealEstatePickerComponent;
  let fixture: ComponentFixture<RealEstatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealEstatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
