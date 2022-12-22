import { TestBed } from '@angular/core/testing';

import { PusatTanggungjawabService } from './pusat-tanggungjawab.service';

describe('PusatTanggungjawabService', () => {
  let service: PusatTanggungjawabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PusatTanggungjawabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
