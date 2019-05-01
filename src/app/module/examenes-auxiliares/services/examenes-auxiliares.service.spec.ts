import { TestBed, inject } from '@angular/core/testing';

import { ExamenesAuxiliaresService } from './examenes-auxiliares.service';

describe('ExamenesAuxiliaresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamenesAuxiliaresService]
    });
  });

  it('should be created', inject([ExamenesAuxiliaresService], (service: ExamenesAuxiliaresService) => {
    expect(service).toBeTruthy();
  }));
});
