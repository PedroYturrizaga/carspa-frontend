import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarAlmacenComponent } from './gestionar-almacen.component';

describe('GestionarAlmacenComponent', () => {
  let component: GestionarAlmacenComponent;
  let fixture: ComponentFixture<GestionarAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionarAlmacenComponent ]
    })
    .compileComponents();
  }));
  
  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
