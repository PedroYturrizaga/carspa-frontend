import { TestBed, inject } from '@angular/core/testing';

import { AcreditaService } from './acredita.service';

describe('AcreditaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcreditaService]
    });
  });

  it('should be created', inject([AcreditaService], (service: AcreditaService) => {
    expect(service).toBeTruthy();
  }));
});
