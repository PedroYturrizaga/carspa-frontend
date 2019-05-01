import { TestBed, inject } from '@angular/core/testing';

import { ResultadoAtencionService } from './resultado-atencion.service';

describe('ResultadoAtencionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResultadoAtencionService]
    });
  });

  it('should be created', inject([ResultadoAtencionService], (service: ResultadoAtencionService) => {
    expect(service).toBeTruthy();
  }));
});
