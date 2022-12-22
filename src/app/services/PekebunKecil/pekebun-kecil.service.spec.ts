import { TestBed } from '@angular/core/testing';

import { PekebunKecilService } from './pekebun-kecil.service';

describe('PekebunKecilService', () => {
  let service: PekebunKecilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PekebunKecilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
