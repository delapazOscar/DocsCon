import { TestBed } from '@angular/core/testing';

import { DatosfacturaService } from './datosfactura.service';

describe('DatosfacturaService', () => {
  let service: DatosfacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosfacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
