import { TestBed } from '@angular/core/testing';

import { MukimService } from './mukim.service';

describe('MukimService', () => {
  let service: MukimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MukimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
