import { TestBed, inject } from '@angular/core/testing';

import { EsquemaDeVacunacionService } from './esquema-de-vacunacion.service';

describe('EsquemaDeVacunacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsquemaDeVacunacionService]
    });
  });

  it('should be created', inject([EsquemaDeVacunacionService], (service: EsquemaDeVacunacionService) => {
    expect(service).toBeTruthy();
  }));
});
