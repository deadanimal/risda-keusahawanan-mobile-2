import { TestBed } from '@angular/core/testing';

import { InsentifService } from './insentif.service';

describe('InsentifService', () => {
  let service: InsentifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InsentifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
