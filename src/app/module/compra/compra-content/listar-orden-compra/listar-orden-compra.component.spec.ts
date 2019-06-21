import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOrdenCompraComponent } from './listar-orden-compra.component';

describe('ListarOrdenCompraComponent', () => {
  let component: ListarOrdenCompraComponent;
  let fixture: ComponentFixture<ListarOrdenCompraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarOrdenCompraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOrdenCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
