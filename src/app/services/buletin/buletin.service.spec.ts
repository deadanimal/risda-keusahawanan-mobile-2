import { TestBed } from '@angular/core/testing';

import { BuletinService } from './buletin.service';

describe('BuletinService', () => {
  let service: BuletinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuletinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
