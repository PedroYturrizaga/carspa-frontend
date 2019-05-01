import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesAuxiliaresImagenologiaComponent } from './examenes-auxiliares-imagenologia.component';

describe('ExamenesAuxiliaresImagenologiaComponent', () => {
  let component: ExamenesAuxiliaresImagenologiaComponent;
  let fixture: ComponentFixture<ExamenesAuxiliaresImagenologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesAuxiliaresImagenologiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesAuxiliaresImagenologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
