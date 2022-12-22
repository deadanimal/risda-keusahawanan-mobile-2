import { TestBed } from '@angular/core/testing';

import { SeksyenService } from './seksyen.service';

describe('SeksyenService', () => {
  let service: SeksyenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeksyenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
