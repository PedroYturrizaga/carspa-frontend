import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsquemaDeVacunacionComponent } from './esquema-de-vacunacion.component';

describe('EsquemaDeVacunacionComponent', () => {
  let component: EsquemaDeVacunacionComponent;
  let fixture: ComponentFixture<EsquemaDeVacunacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsquemaDeVacunacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsquemaDeVacunacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
