import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCajaComponent } from './gestionar-caja.component';

describe('GestionarCajaComponent', () => {
  let component: GestionarCajaComponent;
  let fixture: ComponentFixture<GestionarCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
