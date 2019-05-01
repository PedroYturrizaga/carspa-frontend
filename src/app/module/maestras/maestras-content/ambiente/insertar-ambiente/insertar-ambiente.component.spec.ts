import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarAmbienteComponent } from './insertar-ambiente.component';

describe('InsertarAmbienteComponent', () => {
  let component: InsertarAmbienteComponent;
  let fixture: ComponentFixture<InsertarAmbienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarAmbienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
