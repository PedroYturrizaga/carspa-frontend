import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturCierreCajaComponent } from './apertur-cierre-caja.component';

describe('AperturCierreCajaComponent', () => {
  let component: AperturCierreCajaComponent;
  let fixture: ComponentFixture<AperturCierreCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AperturCierreCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AperturCierreCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
