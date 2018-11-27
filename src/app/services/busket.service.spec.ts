import { TestBed } from '@angular/core/testing';

import { BusketService } from './busket.service';

describe('BusketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusketService = TestBed.get(BusketService);
    expect(service).toBeTruthy();
  });
});
