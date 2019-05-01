import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTipoOrdenComponent } from './eliminar-tipo-orden.component';

describe('EliminarTipoOrdenComponent', () => {
  let component: EliminarTipoOrdenComponent;
  let fixture: ComponentFixture<EliminarTipoOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarTipoOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarTipoOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
