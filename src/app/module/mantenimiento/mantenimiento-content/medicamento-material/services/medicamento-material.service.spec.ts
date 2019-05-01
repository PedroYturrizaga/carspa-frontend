import { TestBed, inject } from '@angular/core/testing';

import { MedicamentoMaterialService } from './medicamento-material.service';

describe('MedicamentoMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicamentoMaterialService]
    });
  });

  it('should be created', inject([MedicamentoMaterialService], (service: MedicamentoMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
