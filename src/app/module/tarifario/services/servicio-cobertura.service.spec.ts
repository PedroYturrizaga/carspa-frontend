import { TestBed, inject } from '@angular/core/testing';

import { ServicioCoberturaService } from './servicio-cobertura.service';

describe('ServicioCoberturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioCoberturaService]
    });
  });

  it('should be created', inject([ServicioCoberturaService], (service: ServicioCoberturaService) => {
    expect(service).toBeTruthy();
  }));
});
