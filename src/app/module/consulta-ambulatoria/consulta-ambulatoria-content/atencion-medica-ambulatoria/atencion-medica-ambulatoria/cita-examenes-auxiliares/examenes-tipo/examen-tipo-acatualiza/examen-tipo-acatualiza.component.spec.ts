import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenTipoAcatualizaComponent } from './examen-tipo-acatualiza.component';

describe('ExamenTipoAcatualizaComponent', () => {
  let component: ExamenTipoAcatualizaComponent;
  let fixture: ComponentFixture<ExamenTipoAcatualizaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenTipoAcatualizaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenTipoAcatualizaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
