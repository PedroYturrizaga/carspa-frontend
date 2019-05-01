import { TestBed, inject } from '@angular/core/testing';

import { ValoracionGeriatricaService } from './valoracion-geriatrica.service';

describe('ValoracionGeriatricaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValoracionGeriatricaService]
    });
  });

  it('should be created', inject([ValoracionGeriatricaService], (service: ValoracionGeriatricaService) => {
    expect(service).toBeTruthy();
  }));
});
