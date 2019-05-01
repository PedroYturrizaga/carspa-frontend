import { TestBed, inject } from '@angular/core/testing';

import { CitaProcedimientoService } from './cita-procedimiento.service';

describe('CitaProcedimientoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitaProcedimientoService]
    });
  });

  it('should be created', inject([CitaProcedimientoService], (service: CitaProcedimientoService) => {
    expect(service).toBeTruthy();
  }));
});
