import { TestBed, inject } from '@angular/core/testing';

import { AreaEspecialidadActividadService } from './area-especialidad-actividad.service';

describe('AreaEspecialidadActividadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaEspecialidadActividadService]
    });
  });

  it('should be created', inject([AreaEspecialidadActividadService], (service: AreaEspecialidadActividadService) => {
    expect(service).toBeTruthy();
  }));
});
