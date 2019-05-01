import { TestBed, inject } from '@angular/core/testing';

import { FiliacionService } from './filiacion.service';

describe('FiliacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiliacionService]
    });
  });

  it('should be created', inject([FiliacionService], (service: FiliacionService) => {
    expect(service).toBeTruthy();
  }));
});
