import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarProductoComponent } from './insertar-producto.component';

describe('InsertarProductoComponent', () => {
  let component: InsertarProductoComponent;
  let fixture: ComponentFixture<InsertarProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
