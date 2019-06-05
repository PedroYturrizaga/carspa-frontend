import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarSalidaMaterialComponent } from './visualizar-salida-material.component';

describe('VisualizarSalidaMaterialComponent', () => {
  let component: VisualizarSalidaMaterialComponent;
  let fixture: ComponentFixture<VisualizarSalidaMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarSalidaMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarSalidaMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
