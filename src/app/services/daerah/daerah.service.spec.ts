import { TestBed } from '@angular/core/testing';

import { DaerahService } from './daerah.service';

describe('DaerahService', () => {
  let service: DaerahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaerahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
