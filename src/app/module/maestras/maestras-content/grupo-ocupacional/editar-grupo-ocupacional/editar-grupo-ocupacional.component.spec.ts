import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGrupoOcupacionalComponent } from './editar-grupo-ocupacional.component';

describe('EditarGrupoOcupacionalComponent', () => {
  let component: EditarGrupoOcupacionalComponent;
  let fixture: ComponentFixture<EditarGrupoOcupacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarGrupoOcupacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarGrupoOcupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
