import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEditarRolComponent } from './crear-editar-rol.component';

describe('CrearEditarRolComponent', () => {
  let component: CrearEditarRolComponent;
  let fixture: ComponentFixture<CrearEditarRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEditarRolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEditarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
