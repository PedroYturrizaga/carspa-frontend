import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarInventarioComponent } from './visualizar-inventario.component';

describe('VisualizarInventarioComponent', () => {
  let component: VisualizarInventarioComponent;
  let fixture: ComponentFixture<VisualizarInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
