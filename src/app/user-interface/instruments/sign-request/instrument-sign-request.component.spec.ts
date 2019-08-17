import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestSignerComponent } from './instrument-sign-request.component';

describe('RequestSignerComponent', () => {
  let component: RequestSignerComponent;
  let fixture: ComponentFixture<RequestSignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestSignerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestSignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
