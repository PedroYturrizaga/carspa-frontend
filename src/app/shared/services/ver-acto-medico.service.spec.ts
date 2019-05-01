import { TestBed, inject } from '@angular/core/testing';

import { VerActoMedicoService } from './ver-acto-medico.service';

describe('VerActoMedicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerActoMedicoService]
    });
  });

  it('should be created', inject([VerActoMedicoService], (service: VerActoMedicoService) => {
    expect(service).toBeTruthy();
  }));
});
