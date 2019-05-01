import { TestBed, inject } from '@angular/core/testing';

import { PersonalContratanteService } from './personal-contratante.service';

describe('PersonalContratanteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonalContratanteService]
    });
  });

  it('should be created', inject([PersonalContratanteService], (service: PersonalContratanteService) => {
    expect(service).toBeTruthy();
  }));
});
