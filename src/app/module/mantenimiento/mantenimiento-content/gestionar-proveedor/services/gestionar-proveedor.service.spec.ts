import { TestBed, inject } from '@angular/core/testing';

import { GestionarProveedorService } from './gestionar-proveedor.service';

describe('GestionarProveedorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GestionarProveedorService]
    });
  });

  it('should be created', inject([GestionarProveedorService], (service: GestionarProveedorService) => {
    expect(service).toBeTruthy();
  }));
});
