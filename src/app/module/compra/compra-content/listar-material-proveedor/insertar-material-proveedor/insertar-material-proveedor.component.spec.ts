import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarMaterialProveedorComponent } from './insertar-material-proveedor.component';

describe('InsertarMaterialProveedorComponent', () => {
  let component: InsertarMaterialProveedorComponent;
  let fixture: ComponentFixture<InsertarMaterialProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarMaterialProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarMaterialProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
