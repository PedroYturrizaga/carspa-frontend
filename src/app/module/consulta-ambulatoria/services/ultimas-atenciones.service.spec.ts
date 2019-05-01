import { TestBed, inject } from '@angular/core/testing';

import { UltimasAtencionesService } from './ultimas-atenciones.service';

describe('UltimasAtencionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UltimasAtencionesService]
    });
  });

  it('should be created', inject([UltimasAtencionesService], (service: UltimasAtencionesService) => {
    expect(service).toBeTruthy();
  }));
});
