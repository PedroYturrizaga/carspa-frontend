import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarDetalleComponent } from './confirmar-detalle.component';

describe('ConfirmarDetalleComponent', () => {
  let component: ConfirmarDetalleComponent;
  let fixture: ComponentFixture<ConfirmarDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
