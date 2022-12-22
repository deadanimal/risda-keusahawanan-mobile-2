import { TestBed } from '@angular/core/testing';

import { ParlimenService } from './parlimen.service';

describe('ParlimenService', () => {
  let service: ParlimenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParlimenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
