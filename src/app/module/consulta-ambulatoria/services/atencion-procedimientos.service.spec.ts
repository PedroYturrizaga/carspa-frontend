import { TestBed, inject } from '@angular/core/testing';

import { AtencionProcedimientosService } from './atencion-procedimientos.service';

describe('AtencionProcedimientosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtencionProcedimientosService]
    });
  });

  it('should be created', inject([AtencionProcedimientosService], (service: AtencionProcedimientosService) => {
    expect(service).toBeTruthy();
  }));
});
