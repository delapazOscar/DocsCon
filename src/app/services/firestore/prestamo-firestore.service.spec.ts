import { TestBed } from '@angular/core/testing';

import { PrestamoFirestoreService } from './prestamo-firestore.service';

describe('PrestamoFirestoreService', () => {
  let service: PrestamoFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamoFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
