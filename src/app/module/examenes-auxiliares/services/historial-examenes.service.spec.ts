import { TestBed, inject } from '@angular/core/testing';

import { HistorialExamenesService } from './historial-examenes.service';

describe('HistorialExamenesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistorialExamenesService]
    });
  });

  it('should be created', inject([HistorialExamenesService], (service: HistorialExamenesService) => {
    expect(service).toBeTruthy();
  }));
});
