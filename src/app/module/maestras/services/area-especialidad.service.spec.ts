import { TestBed, inject } from '@angular/core/testing';

import { AreaEspecialidadService } from './area-especialidad.service';

describe('AreaEspecialidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaEspecialidadService]
    });
  });

  it('should be created', inject([AreaEspecialidadService], (service: AreaEspecialidadService) => {
    expect(service).toBeTruthy();
  }));
});
