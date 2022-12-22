import { TestBed } from '@angular/core/testing';

import { DunService } from './dun.service';

describe('DunService', () => {
  let service: DunService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DunService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
