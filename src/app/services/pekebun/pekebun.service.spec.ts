import { TestBed } from '@angular/core/testing';

import { PekebunService } from './pekebun.service';

describe('PekebunService', () => {
  let service: PekebunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PekebunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
