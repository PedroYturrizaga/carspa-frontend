import { TestBed, inject } from '@angular/core/testing';

import { ProgramacionAprobacionService } from './programacion-aprobacion.service';

describe('ProgramacionAprobacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProgramacionAprobacionService]
    });
  });

  it('should be created', inject([ProgramacionAprobacionService], (service: ProgramacionAprobacionService) => {
    expect(service).toBeTruthy();
  }));
});
