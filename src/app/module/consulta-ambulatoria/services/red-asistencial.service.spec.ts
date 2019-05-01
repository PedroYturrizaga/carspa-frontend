import { TestBed, inject } from '@angular/core/testing';

import { RedAsistencialService } from './red-asistencial.service';

describe('RedAsistencialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedAsistencialService]
    });
  });

  it('should be created', inject([RedAsistencialService], (service: RedAsistencialService) => {
    expect(service).toBeTruthy();
  }));
});
