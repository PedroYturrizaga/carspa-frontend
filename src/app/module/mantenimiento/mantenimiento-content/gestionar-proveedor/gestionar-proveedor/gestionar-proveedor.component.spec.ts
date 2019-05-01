import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarProveedorComponent } from './gestionar-proveedor.component';

describe('GestionarProveedorComponent', () => {
  let component: GestionarProveedorComponent;
  let fixture: ComponentFixture<GestionarProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
