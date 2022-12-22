import { TestBed } from '@angular/core/testing';

import { KategoriAliranService } from './kategori-aliran.service';

describe('KategoriAliranService', () => {
  let service: KategoriAliranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KategoriAliranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
