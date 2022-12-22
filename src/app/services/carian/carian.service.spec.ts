import { TestBed } from '@angular/core/testing';

import { CarianService } from './carian.service';

describe('CarianService', () => {
  let service: CarianService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarianService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
