import { TestBed } from '@angular/core/testing';

import { JenisInsentifService } from './jenis-insentif.service';

describe('JenisInsentifService', () => {
  let service: JenisInsentifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JenisInsentifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
