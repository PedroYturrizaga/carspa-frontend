import { TestBed, inject } from '@angular/core/testing';

import { AsignarCoberturaService } from './asignar-cobertura.service';

describe('AsignarCoberturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AsignarCoberturaService]
    });
  });

  it('should be created', inject([AsignarCoberturaService], (service: AsignarCoberturaService) => {
    expect(service).toBeTruthy();
  }));
});
