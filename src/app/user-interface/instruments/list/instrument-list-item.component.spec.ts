import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentListItemComponent } from './instrument-list-item.component';

describe('InstrumentListItemComponent', () => {
  let component: InstrumentListItemComponent;
  let fixture: ComponentFixture<InstrumentListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
