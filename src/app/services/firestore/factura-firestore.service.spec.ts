import { TestBed } from '@angular/core/testing';

import { FacturaFirestoreService } from './factura-firestore.service';

describe('FacturaFirestoreService', () => {
  let service: FacturaFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
