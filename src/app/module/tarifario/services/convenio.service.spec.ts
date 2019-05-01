import { TestBed, inject } from '@angular/core/testing';

import { ConvenioService } from './convenio.service';

describe('ConvenioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConvenioService]
    });
  });

  it('should be created', inject([ConvenioService], (service: ConvenioService) => {
    expect(service).toBeTruthy();
  }));
});
