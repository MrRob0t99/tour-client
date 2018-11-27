import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllTourComponent } from './get-all-tour.component';

describe('GetAllTourComponent', () => {
  let component: GetAllTourComponent;
  let fixture: ComponentFixture<GetAllTourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAllTourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
