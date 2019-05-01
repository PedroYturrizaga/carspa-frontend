import { TestBed, inject } from '@angular/core/testing';

import { ExamenFisicoService } from './examen-fisico.service';

describe('ExamenFisicoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamenFisicoService]
    });
  });

  it('should be created', inject([ExamenFisicoService], (service: ExamenFisicoService) => {
    expect(service).toBeTruthy();
  }));
});
