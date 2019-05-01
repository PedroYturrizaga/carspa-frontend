import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSolicitudAtendidasComponent } from './visualizar-solicitud-atendidas.component';

describe('VisualizarSolicitudAtendidasComponent', () => {
  let component: VisualizarSolicitudAtendidasComponent;
  let fixture: ComponentFixture<VisualizarSolicitudAtendidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarSolicitudAtendidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarSolicitudAtendidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
