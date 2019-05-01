import { TestBed, inject } from '@angular/core/testing';

import { ReportCierreCajaService } from './report-cierre-caja.service';

describe('ReportCierreCajaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportCierreCajaService]
    });
  });

  it('should be created', inject([ReportCierreCajaService], (service: ReportCierreCajaService) => {
    expect(service).toBeTruthy();
  }));
});
