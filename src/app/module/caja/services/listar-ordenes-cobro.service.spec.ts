import { TestBed, inject } from '@angular/core/testing';

import { ListarOrdenesCobroService } from './listar-ordenes-cobro.service';

describe('ListarOrdenesCobroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListarOrdenesCobroService]
    });
  });

  it('should be created', inject([ListarOrdenesCobroService], (service: ListarOrdenesCobroService) => {
    expect(service).toBeTruthy();
  }));
});
