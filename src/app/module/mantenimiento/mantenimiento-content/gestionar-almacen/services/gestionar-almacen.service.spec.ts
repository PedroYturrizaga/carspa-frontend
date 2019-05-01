import { TestBed, inject } from '@angular/core/testing';

import { GestionarAlmacenService } from './gestionar-almacen.service';

describe('GestionarAlmacenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionarAlmacenService]
    });
  });

  it('should be created', inject([GestionarAlmacenService], (service: GestionarAlmacenService) => {
    expect(service).toBeTruthy();
  }));
});
