import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarMaterialesComponent } from './visualizar-materiales.component';

describe('VisualizarMaterialesComponent', () => {
  let component: VisualizarMaterialesComponent;
  let fixture: ComponentFixture<VisualizarMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
