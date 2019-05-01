import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesImagenologiaActualizaComponent } from './examenes-imagenologia-actualiza.component';

describe('ExamenesImagenologiaActualizaComponent', () => {
  let component: ExamenesImagenologiaActualizaComponent;
  let fixture: ComponentFixture<ExamenesImagenologiaActualizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesImagenologiaActualizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesImagenologiaActualizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
