import { TestBed } from '@angular/core/testing';

import { NegeriService } from './negeri.service';

describe('NegeriService', () => {
  let service: NegeriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegeriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
