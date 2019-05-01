import { TestBed, inject } from '@angular/core/testing';

import { TarifarioService } from './tarifario.service';

describe('TarifarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TarifarioService]
    });
  });

  it('should be created', inject([TarifarioService], (service: TarifarioService) => {
    expect(service).toBeTruthy();
  }));
});
