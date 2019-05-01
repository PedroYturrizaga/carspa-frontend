import { TestBed, inject } from '@angular/core/testing';

import { AmbienteService } from './ambiente.service';

describe('AmbienteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmbienteService]
    });
  });

  it('should be created', inject([AmbienteService], (service: AmbienteService) => {
    expect(service).toBeTruthy();
  }));
});
