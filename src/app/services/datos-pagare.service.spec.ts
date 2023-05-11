import { TestBed } from '@angular/core/testing';

import { DatosPagareService } from './datos-pagare.service';

describe('DatosPagareService', () => {
  let service: DatosPagareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosPagareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
