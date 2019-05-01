import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarEditarContratanteComponent } from './insertar-editar-contratante.component';

describe('InsertarEditarContratanteComponent', () => {
  let component: InsertarEditarContratanteComponent;
  let fixture: ComponentFixture<InsertarEditarContratanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarEditarContratanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarEditarContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
