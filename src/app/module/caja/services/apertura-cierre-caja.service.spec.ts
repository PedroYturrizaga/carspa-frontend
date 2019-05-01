import { TestBed, inject } from '@angular/core/testing';

import { AperturaCierreCajaService } from './apertura-cierre-caja.service';

describe('AperturaCierreCajaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AperturaCierreCajaService]
    });
  });

  it('should be created', inject([AperturaCierreCajaService], (service: AperturaCierreCajaService) => {
    expect(service).toBeTruthy();
  }));
});
