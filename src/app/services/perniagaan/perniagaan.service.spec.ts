import { TestBed } from '@angular/core/testing';

import { PerniagaanService } from './perniagaan.service';

describe('PerniagaanService', () => {
  let service: PerniagaanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerniagaanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
