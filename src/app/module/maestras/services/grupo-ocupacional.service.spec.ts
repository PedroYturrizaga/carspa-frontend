import { TestBed, inject } from '@angular/core/testing';

import { GrupoOcupacionalService } from './grupo-ocupacional.service';

describe('GrupoOcupacionalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GrupoOcupacionalService]
    });
  });

  it('should be created', inject([GrupoOcupacionalService], (service: GrupoOcupacionalService) => {
    expect(service).toBeTruthy();
  }));
});
