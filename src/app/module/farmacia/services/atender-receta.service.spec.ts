import { TestBed, inject } from '@angular/core/testing';

import { AtenderRecetaService } from './atender-receta.service';

describe('AtenderRecetaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtenderRecetaService]
    });
  });

  it('should be created', inject([AtenderRecetaService], (service: AtenderRecetaService) => {
    expect(service).toBeTruthy();
  }));
});
