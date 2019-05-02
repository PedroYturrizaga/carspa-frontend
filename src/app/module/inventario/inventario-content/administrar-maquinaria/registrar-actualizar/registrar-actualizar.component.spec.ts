import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarActualizarComponent } from './registrar-actualizar.component';

describe('RegistrarActualizarComponent', () => {
  let component: RegistrarActualizarComponent;
  let fixture: ComponentFixture<RegistrarActualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarActualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarActualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
