import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarDetalleRecetaComponent } from './visualizar-detalle-receta.component';

describe('VisualizarDetalleRecetaComponent', () => {
  let component: VisualizarDetalleRecetaComponent;
  let fixture: ComponentFixture<VisualizarDetalleRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarDetalleRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarDetalleRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
