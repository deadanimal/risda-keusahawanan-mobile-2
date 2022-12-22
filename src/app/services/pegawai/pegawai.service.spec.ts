import { TestBed } from '@angular/core/testing';

import { PegawaiService } from './pegawai.service';

describe('PegawaiService', () => {
  let service: PegawaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PegawaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
