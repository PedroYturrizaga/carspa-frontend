import { TestBed, inject } from '@angular/core/testing';

import { EspecialidadService } from './especialidad.service';

describe('EspecialidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EspecialidadService]
    });
  });

  it('should be created', inject([EspecialidadService], (service: EspecialidadService) => {
    expect(service).toBeTruthy();
  }));
});
