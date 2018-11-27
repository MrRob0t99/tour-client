import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTourComponent } from './get-tour.component';

describe('GetTourComponent', () => {
  let component: GetTourComponent;
  let fixture: ComponentFixture<GetTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
