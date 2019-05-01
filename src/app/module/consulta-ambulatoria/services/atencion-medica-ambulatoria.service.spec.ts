import { TestBed, inject } from '@angular/core/testing';

import { AtencionMedicaAmbulatoriaService } from './atencion-medica-ambulatoria.service';

describe('AtencionMedicaAmbulatoriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtencionMedicaAmbulatoriaService]
    });
  });

  it('should be created', inject([AtencionMedicaAmbulatoriaService], (service: AtencionMedicaAmbulatoriaService) => {
    expect(service).toBeTruthy();
  }));
});
