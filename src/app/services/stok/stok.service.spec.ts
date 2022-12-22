import { TestBed } from '@angular/core/testing';

import { StokService } from './stok.service';

describe('StokService', () => {
  let service: StokService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StokService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
