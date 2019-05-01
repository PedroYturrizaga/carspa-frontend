import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturarCajaComponent } from './aperturar-caja.component';

describe('AperturarCajaComponent', () => {
  let component: AperturarCajaComponent;
  let fixture: ComponentFixture<AperturarCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AperturarCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AperturarCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
