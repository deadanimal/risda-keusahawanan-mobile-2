import { TestBed } from '@angular/core/testing';

import { UsahawanService } from './usahawan.service';

describe('UsahawanService', () => {
  let service: UsahawanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsahawanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
