import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarMedicoProductoCaroComponent } from './visualizar-medico-producto-caro.component';

describe('VisualizarMedicoProductoCaroComponent', () => {
  let component: VisualizarMedicoProductoCaroComponent;
  let fixture: ComponentFixture<VisualizarMedicoProductoCaroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarMedicoProductoCaroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarMedicoProductoCaroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
