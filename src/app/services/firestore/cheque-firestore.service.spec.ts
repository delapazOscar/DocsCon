import { TestBed } from '@angular/core/testing';

import { ChequeFirestoreService } from './cheque-firestore.service';

describe('ChequeFirestoreService', () => {
  let service: ChequeFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChequeFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
