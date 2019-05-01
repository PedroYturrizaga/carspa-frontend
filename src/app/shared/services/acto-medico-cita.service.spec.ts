import { TestBed, inject } from '@angular/core/testing';

import { ActoMedicoCitaService } from './acto-medico-cita.service';

describe('ActoMedicoCitaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActoMedicoCitaService]
    });
  });

  it('should be created', inject([ActoMedicoCitaService], (service: ActoMedicoCitaService) => {
    expect(service).toBeTruthy();
  }));
});
