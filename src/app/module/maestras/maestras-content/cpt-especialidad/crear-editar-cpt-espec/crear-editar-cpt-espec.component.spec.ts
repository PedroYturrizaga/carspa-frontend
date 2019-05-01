import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarCptEspecComponent } from './crear-editar-cpt-espec.component';

describe('CrearEditarCptEspecComponent', () => {
  let component: CrearEditarCptEspecComponent;
  let fixture: ComponentFixture<CrearEditarCptEspecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarCptEspecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarCptEspecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
