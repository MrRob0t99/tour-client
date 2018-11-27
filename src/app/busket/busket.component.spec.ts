import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusketComponent } from './busket.component';

describe('BusketComponent', () => {
  let component: BusketComponent;
  let fixture: ComponentFixture<BusketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
