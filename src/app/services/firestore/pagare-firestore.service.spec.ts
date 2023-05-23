import { TestBed } from '@angular/core/testing';

import { PagareFirestoreService } from './pagare-firestore.service';

describe('PagareFirestoreService', () => {
  let service: PagareFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagareFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
