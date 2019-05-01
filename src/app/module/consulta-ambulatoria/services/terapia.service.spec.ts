import { TestBed, inject } from '@angular/core/testing';

import { TerapiaService } from './terapia.service';

describe('TerapiaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerapiaService]
    });
  });

  it('should be created', inject([TerapiaService], (service: TerapiaService) => {
    expect(service).toBeTruthy();
  }));
});
