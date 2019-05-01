import { TestBed, inject } from '@angular/core/testing';

import { ReferenciaService } from './referencia.service';

describe('ReferenciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReferenciaService]
    });
  });

  it('should be created', inject([ReferenciaService], (service: ReferenciaService) => {
    expect(service).toBeTruthy();
  }));
});
