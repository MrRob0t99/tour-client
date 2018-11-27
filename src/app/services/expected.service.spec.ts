import { TestBed } from '@angular/core/testing';

import { ExpectedService } from './expected.service';

describe('ExpectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpectedService = TestBed.get(ExpectedService);
    expect(service).toBeTruthy();
  });
});
