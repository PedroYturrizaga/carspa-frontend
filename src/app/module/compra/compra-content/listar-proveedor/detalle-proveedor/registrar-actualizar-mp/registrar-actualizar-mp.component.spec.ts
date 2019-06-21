import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarActualizarMpComponent } from './registrar-actualizar-mp.component';

describe('RegistrarActualizarMpComponent', () => {
  let component: RegistrarActualizarMpComponent;
  let fixture: ComponentFixture<RegistrarActualizarMpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarActualizarMpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarActualizarMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
