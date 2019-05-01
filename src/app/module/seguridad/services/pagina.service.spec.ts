import { TestBed, inject } from '@angular/core/testing';

import { PaginaService } from './pagina.service';

describe('PaginaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaginaService]
    });
  });

  it('should be created', inject([PaginaService], (service: PaginaService) => {
    expect(service).toBeTruthy();
  }));
});
