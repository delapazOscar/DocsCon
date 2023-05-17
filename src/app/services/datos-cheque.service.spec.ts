import { TestBed } from '@angular/core/testing';

import { DatosChequeService } from './datos-cheque.service';

describe('DatosChequeService', () => {
  let service: DatosChequeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosChequeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
