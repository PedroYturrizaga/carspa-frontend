import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProgramacionImagenologiaComponent } from './listado-programacion-imagenologia.component';

describe('ListadoProgramacionImagenologiaComponent', () => {
  let component: ListadoProgramacionImagenologiaComponent;
  let fixture: ComponentFixture<ListadoProgramacionImagenologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoProgramacionImagenologiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoProgramacionImagenologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
