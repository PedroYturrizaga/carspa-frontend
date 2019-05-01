import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSolicitudComponent } from './visualizar-solicitud.component';

describe('VisualizarSolicitudComponent', () => {
  let component: VisualizarSolicitudComponent;
  let fixture: ComponentFixture<VisualizarSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
