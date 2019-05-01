import { TestBed, inject } from '@angular/core/testing';

import { ReporteFarmaciaService } from './reporte-farmacia.service';

describe('ReporteFarmaciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReporteFarmaciaService]
    });
  });

  it('should be created', inject([ReporteFarmaciaService], (service: ReporteFarmaciaService) => {
    expect(service).toBeTruthy();
  }));
});
