import { TestBed, inject } from '@angular/core/testing';

import { AdministrarMaterialService } from './administrar-material.service';

describe('AdministrarMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministrarMaterialService]
    });
  });

  it('should be created', inject([AdministrarMaterialService], (service: AdministrarMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
