import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRestriccionesComponent } from './modal-restricciones.component';

describe('ModalRestriccionesComponent', () => {
  let component: ModalRestriccionesComponent;
  let fixture: ComponentFixture<ModalRestriccionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRestriccionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRestriccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
