import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEspecialidadActividadComponent } from './area-especialidad-actividad.component';

describe('AreaEspecialidadActividadComponent', () => {
  let component: AreaEspecialidadActividadComponent;
  let fixture: ComponentFixture<AreaEspecialidadActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaEspecialidadActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaEspecialidadActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
