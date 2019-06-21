import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarSolicitudComponent } from './generar-solicitud.component';

describe('GenerarSolicitudComponent', () => {
  let component: GenerarSolicitudComponent;
  let fixture: ComponentFixture<GenerarSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
