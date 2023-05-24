import { TestBed } from '@angular/core/testing';

import { DatosCurriculumService } from './datos-curriculum.service';

describe('DatosCurriculumService', () => {
  let service: DatosCurriculumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCurriculumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
