import { TestBed, inject } from '@angular/core/testing';

import { MantenimientoAnaquelService } from './mantenimiento-anaquel.service';

describe('MantenimientoAnaquelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MantenimientoAnaquelService]
    });
  });

  it('should be created', inject([MantenimientoAnaquelService], (service: MantenimientoAnaquelService) => {
    expect(service).toBeTruthy();
  }));
});
