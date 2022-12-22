import { TestBed } from '@angular/core/testing';

import { LawatanService } from './lawatan.service';

describe('LawatanService', () => {
  let service: LawatanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LawatanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
