import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarAusenciaComponent } from './confirmar-ausencia.component';

describe('ConfirmarAusenciaComponent', () => {
  let component: ConfirmarAusenciaComponent;
  let fixture: ComponentFixture<ConfirmarAusenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarAusenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarAusenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
