import { TestBed, inject } from '@angular/core/testing';

import { AdministrarCajaService } from './administrar-caja.service';

describe('AdministrarCajaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarCajaService]
    });
  });

  it('should be created', inject([AdministrarCajaService], (service: AdministrarCajaService) => {
    expect(service).toBeTruthy();
  }));
});
