import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarProveedorComponent } from './administrar-proveedor.component';

describe('AdministrarProveedorComponent', () => {
  let component: AdministrarProveedorComponent;
  let fixture: ComponentFixture<AdministrarProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
