import { TestBed, inject } from '@angular/core/testing';

import { CoberturaServiceService } from './cobertura-service.service';

describe('CoberturaServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoberturaServiceService]
    });
  });

  it('should be created', inject([CoberturaServiceService], (service: CoberturaServiceService) => {
    expect(service).toBeTruthy();
  }));
});
