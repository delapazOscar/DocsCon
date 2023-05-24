import { TestBed } from '@angular/core/testing';

import { CurriculumFirestoreService } from './curriculum-firestore.service';

describe('CurriculumFirestoreService', () => {
  let service: CurriculumFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculumFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
