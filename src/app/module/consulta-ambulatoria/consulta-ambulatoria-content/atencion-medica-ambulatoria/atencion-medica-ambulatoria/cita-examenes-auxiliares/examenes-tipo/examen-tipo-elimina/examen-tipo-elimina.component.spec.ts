import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenTipoEliminaComponent } from './examen-tipo-elimina.component';

describe('ExamenTipoEliminaComponent', () => {
  let component: ExamenTipoEliminaComponent;
  let fixture: ComponentFixture<ExamenTipoEliminaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenTipoEliminaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenTipoEliminaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
