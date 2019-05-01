import { TestBed, inject } from '@angular/core/testing';

import { MovimientoService } from './movimiento.service';

describe('MovimientoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovimientoService]
    });
  });

  it('should be created', inject([MovimientoService], (service: MovimientoService) => {
    expect(service).toBeTruthy();
  }));
});
