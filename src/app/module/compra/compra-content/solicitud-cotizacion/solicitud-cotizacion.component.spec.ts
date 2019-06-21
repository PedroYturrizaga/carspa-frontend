import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCotizacionComponent } from './solicitud-cotizacion.component';

describe('SolicitudCotizacionComponent', () => {
  let component: SolicitudCotizacionComponent;
  let fixture: ComponentFixture<SolicitudCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
