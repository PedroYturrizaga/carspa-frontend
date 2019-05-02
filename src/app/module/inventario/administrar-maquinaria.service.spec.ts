import { TestBed, inject } from '@angular/core/testing';

import { AdministrarMaquinariaService } from './administrar-maquinaria.service';

describe('AdministrarMaquinariaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarMaquinariaService]
    });
  });

  it('should be created', inject([AdministrarMaquinariaService], (service: AdministrarMaquinariaService) => {
    expect(service).toBeTruthy();
  }));
});
