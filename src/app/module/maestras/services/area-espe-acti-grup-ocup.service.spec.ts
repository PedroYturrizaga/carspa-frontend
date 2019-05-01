import { TestBed, inject } from '@angular/core/testing';

import { AreaEspeActiGrupOcupService } from './area-espe-acti-grup-ocup.service';

describe('AreaEspeActiGrupOcupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaEspeActiGrupOcupService]
    });
  });

  it('should be created', inject([AreaEspeActiGrupOcupService], (service: AreaEspeActiGrupOcupService) => {
    expect(service).toBeTruthy();
  }));
});
