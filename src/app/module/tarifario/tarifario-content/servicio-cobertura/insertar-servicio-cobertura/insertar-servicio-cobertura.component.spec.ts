import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarServicioCoberturaComponent } from './insertar-servicio-cobertura.component';

describe('InsertarServicioCoberturaComponent', () => {
  let component: InsertarServicioCoberturaComponent;
  let fixture: ComponentFixture<InsertarServicioCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarServicioCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarServicioCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
