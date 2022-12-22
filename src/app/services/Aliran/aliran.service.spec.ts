import { TestBed } from '@angular/core/testing';

import { AliranService } from './aliran.service';

describe('AliranService', () => {
  let service: AliranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AliranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
