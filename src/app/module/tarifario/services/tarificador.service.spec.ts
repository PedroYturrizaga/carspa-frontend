import { TestBed, inject } from '@angular/core/testing';

import { TarificadorService } from './tarificador.service';

describe('TarificadorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TarificadorService]
    });
  });

  it('should be created', inject([TarificadorService], (service: TarificadorService) => {
    expect(service).toBeTruthy();
  }));
});
