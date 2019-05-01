import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesImagenologiaComponent } from './examenes-imagenologia.component';

describe('ExamenesImagenologiaComponent', () => {
  let component: ExamenesImagenologiaComponent;
  let fixture: ComponentFixture<ExamenesImagenologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesImagenologiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesImagenologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
