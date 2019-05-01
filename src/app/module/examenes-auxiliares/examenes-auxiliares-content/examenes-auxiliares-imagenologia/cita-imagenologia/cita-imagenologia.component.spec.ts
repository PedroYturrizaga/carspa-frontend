import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaImagenologiaComponent } from './cita-imagenologia.component';

describe('CitaImagenologiaComponent', () => {
  let component: CitaImagenologiaComponent;
  let fixture: ComponentFixture<CitaImagenologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaImagenologiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaImagenologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
