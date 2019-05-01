import { TestBed, inject } from '@angular/core/testing';

import { TipoOrdenService } from './tipo-orden.service';

describe('TipoOrdenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoOrdenService]
    });
  });

  it('should be created', inject([TipoOrdenService], (service: TipoOrdenService) => {
    expect(service).toBeTruthy();
  }));
});
