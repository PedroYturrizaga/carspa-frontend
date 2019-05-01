import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarSelectCitaComponent } from './confirmar-select-cita.component';

describe('ConfirmarSelectCitaComponent', () => {
  let component: ConfirmarSelectCitaComponent;
  let fixture: ComponentFixture<ConfirmarSelectCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarSelectCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarSelectCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
