import { TestBed, inject } from '@angular/core/testing';

import { CptEspecialidadService } from './cpt-especialidad.service';

describe('CptEspecialidadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CptEspecialidadService]
    });
  });

  it('should be created', inject([CptEspecialidadService], (service: CptEspecialidadService) => {
    expect(service).toBeTruthy();
  }));
});
