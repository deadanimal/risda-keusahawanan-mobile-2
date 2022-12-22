import { TestBed } from '@angular/core/testing';

import { SyarikatService } from './syarikat.service';

describe('SyarikatService', () => {
  let service: SyarikatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyarikatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
