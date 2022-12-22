import { TestBed } from '@angular/core/testing';

import { KlusterService } from './kluster.service';

describe('KlusterService', () => {
  let service: KlusterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KlusterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
