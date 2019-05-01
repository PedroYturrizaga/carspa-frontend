import { TestBed, inject } from '@angular/core/testing';

import { CoberturaService } from './cobertura.service';

describe('CoberturaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoberturaService]
    });
  });

  it('should be created', inject([CoberturaService], (service: CoberturaService) => {
    expect(service).toBeTruthy();
  }));
});
