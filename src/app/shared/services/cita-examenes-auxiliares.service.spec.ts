import { TestBed, inject } from '@angular/core/testing';

import { CitaExamenesAuxiliaresService } from './cita-examenes-auxiliares.service';

describe('CitaExamenesAuxiliaresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CitaExamenesAuxiliaresService]
    });
  });

  it('should be created', inject([CitaExamenesAuxiliaresService], (service: CitaExamenesAuxiliaresService) => {
    expect(service).toBeTruthy();
  }));
});
