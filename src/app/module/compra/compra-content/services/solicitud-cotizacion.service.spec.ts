import { TestBed, inject } from '@angular/core/testing';

import { SolicitudCotizacionService } from './solicitud-cotizacion.service';

describe('SolicitudCotizacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolicitudCotizacionService]
    });
  });

  it('should be created', inject([SolicitudCotizacionService], (service: SolicitudCotizacionService) => {
    expect(service).toBeTruthy();
  }));
});
