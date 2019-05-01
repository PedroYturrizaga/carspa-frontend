import { TestBed, inject } from '@angular/core/testing';

import { RealizarPagoService } from './realizar-pago.service';

describe('RealizarPagoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealizarPagoService]
    });
  });

  it('should be created', inject([RealizarPagoService], (service: RealizarPagoService) => {
    expect(service).toBeTruthy();
  }));
});
