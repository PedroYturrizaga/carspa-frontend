import { TestBed, inject } from '@angular/core/testing';

import { SubActividadService } from './sub-actividad.service';

describe('SubActividadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubActividadService]
    });
  });

  it('should be created', inject([SubActividadService], (service: SubActividadService) => {
    expect(service).toBeTruthy();
  }));
});
