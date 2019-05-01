import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarServicioComponent } from './crear-editar-servicio.component';

describe('CrearEditarServicioComponent', () => {
  let component: CrearEditarServicioComponent;
  let fixture: ComponentFixture<CrearEditarServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
