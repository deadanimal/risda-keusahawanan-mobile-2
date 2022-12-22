import { TestBed } from '@angular/core/testing';

import { KategoriUsahawanService } from './kategori-usahawan.service';

describe('KategoriUsahawanService', () => {
  let service: KategoriUsahawanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KategoriUsahawanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
