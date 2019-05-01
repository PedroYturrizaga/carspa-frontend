import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearGrupoOcupacionalComponent } from './crear-grupo-ocupacional.component';

describe('CrearGrupoOcupacionalComponent', () => {
  let component: CrearGrupoOcupacionalComponent;
  let fixture: ComponentFixture<CrearGrupoOcupacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearGrupoOcupacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearGrupoOcupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
