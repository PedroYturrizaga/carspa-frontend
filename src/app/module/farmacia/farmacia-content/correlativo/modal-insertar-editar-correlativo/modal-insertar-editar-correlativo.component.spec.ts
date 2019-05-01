import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInsertarEditarCorrelativoComponent } from './modal-insertar-editar-correlativo.component';

describe('ModalInsertarEditarCorrelativoComponent', () => {
  let component: ModalInsertarEditarCorrelativoComponent;
  let fixture: ComponentFixture<ModalInsertarEditarCorrelativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInsertarEditarCorrelativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInsertarEditarCorrelativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
