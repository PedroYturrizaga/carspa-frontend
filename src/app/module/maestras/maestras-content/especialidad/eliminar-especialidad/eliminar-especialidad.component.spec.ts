import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEspecialidadComponent } from './eliminar-especialidad.component';

describe('EliminarEspecialidadComponent', () => {
  let component: EliminarEspecialidadComponent;
  let fixture: ComponentFixture<EliminarEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
