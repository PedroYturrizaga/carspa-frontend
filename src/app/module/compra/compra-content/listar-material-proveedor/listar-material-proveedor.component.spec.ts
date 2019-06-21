import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMaterialProveedorComponent } from './listar-material-proveedor.component';

describe('ListarMaterialProveedorComponent', () => {
  let component: ListarMaterialProveedorComponent;
  let fixture: ComponentFixture<ListarMaterialProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarMaterialProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMaterialProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
