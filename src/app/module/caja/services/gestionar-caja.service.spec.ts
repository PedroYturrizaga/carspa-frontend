import { TestBed, inject } from '@angular/core/testing';

import { GestionarCajaService } from './gestionar-caja.service';

describe('GestionarCajaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionarCajaService]
    });
  });

  it('should be created', inject([GestionarCajaService], (service: GestionarCajaService) => {
    expect(service).toBeTruthy();
  }));
});
