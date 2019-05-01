import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSubActividadComponent } from './crear-sub-actividad.component';

describe('CrearSubActividadComponent', () => {
  let component: CrearSubActividadComponent;
  let fixture: ComponentFixture<CrearSubActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearSubActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSubActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
