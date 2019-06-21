import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCotizacionComponent } from './registrar-cotizacion.component';

describe('RegistrarCotizacionComponent', () => {
  let component: RegistrarCotizacionComponent;
  let fixture: ComponentFixture<RegistrarCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
