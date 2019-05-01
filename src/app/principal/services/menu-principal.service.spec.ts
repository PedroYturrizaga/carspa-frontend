import { TestBed, inject } from '@angular/core/testing';

import { MenuPrincipalService } from './menu-principal.service';

describe('MenuPrincipalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuPrincipalService]
    });
  });

  it('should be created', inject([MenuPrincipalService], (service: MenuPrincipalService) => {
    expect(service).toBeTruthy();
  }));
});
