import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentsMainPageComponent } from './instruments-main-page.component';

describe('MainPageComponent', () => {
  let component: InstrumentsMainPageComponent;
  let fixture: ComponentFixture<InstrumentsMainPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentsMainPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentsMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
