import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarOrdenesCobroComponent } from './listar-ordenes-cobro.component';

describe('ListarOrdenesCobroComponent', () => {
  let component: ListarOrdenesCobroComponent;
  let fixture: ComponentFixture<ListarOrdenesCobroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarOrdenesCobroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarOrdenesCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
