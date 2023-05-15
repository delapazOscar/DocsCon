import { TestBed } from '@angular/core/testing';

import { DatosContratoService } from './datos-contrato.service';

describe('DatosContratoService', () => {
  let service: DatosContratoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosContratoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
