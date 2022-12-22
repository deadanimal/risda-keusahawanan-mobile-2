import { TestBed } from '@angular/core/testing';

import { KampungService } from './kampung.service';

describe('KampungService', () => {
  let service: KampungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KampungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
