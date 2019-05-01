import { TestBed, inject } from '@angular/core/testing';

import { ComboGeneralService } from './combo-general.service';

describe('ComboGeneralService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComboGeneralService]
    });
  });

  it('should be created', inject([ComboGeneralService], (service: ComboGeneralService) => {
    expect(service).toBeTruthy();
  }));
});
