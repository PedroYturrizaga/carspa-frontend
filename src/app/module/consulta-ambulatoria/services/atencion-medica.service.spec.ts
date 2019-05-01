import { TestBed, inject } from '@angular/core/testing';

import { AtencionMedicaService } from './atencion-medica.service';

describe('AtencionMedicaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtencionMedicaService]
    });
  });

  it('should be created', inject([AtencionMedicaService], (service: AtencionMedicaService) => {
    expect(service).toBeTruthy();
  }));
});
