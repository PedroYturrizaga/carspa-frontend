import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesImagenologiaDeleteComponent } from './examenes-imagenologia-delete.component';

describe('ExamenesImagenologiaDeleteComponent', () => {
  let component: ExamenesImagenologiaDeleteComponent;
  let fixture: ComponentFixture<ExamenesImagenologiaDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesImagenologiaDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesImagenologiaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
