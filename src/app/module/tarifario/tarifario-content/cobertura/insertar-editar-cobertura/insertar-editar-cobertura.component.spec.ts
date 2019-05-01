import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarEditarCoberturaComponent } from './insertar-editar-cobertura.component';

describe('InsertarEditarCoberturaComponent', () => {
  let component: InsertarEditarCoberturaComponent;
  let fixture: ComponentFixture<InsertarEditarCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarEditarCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarEditarCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
