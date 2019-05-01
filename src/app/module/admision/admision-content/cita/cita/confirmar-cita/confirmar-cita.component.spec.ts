import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCitaComponent } from './confirmar-cita.component';

describe('ConfirmarCitaComponent', () => {
  let component: ConfirmarCitaComponent;
  let fixture: ComponentFixture<ConfirmarCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
