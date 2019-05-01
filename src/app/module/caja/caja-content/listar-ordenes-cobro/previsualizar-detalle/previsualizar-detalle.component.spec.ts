import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualizarDetalleComponent } from './previsualizar-detalle.component';

describe('PrevisualizarDetalleComponent', () => {
  let component: PrevisualizarDetalleComponent;
  let fixture: ComponentFixture<PrevisualizarDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevisualizarDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisualizarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
