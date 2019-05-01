import { TestBed, inject } from '@angular/core/testing';

import { IafasService } from './iafas.service';

describe('IafasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IafasService]
    });
  });

  it('should be created', inject([IafasService], (service: IafasService) => {
    expect(service).toBeTruthy();
  }));
});
