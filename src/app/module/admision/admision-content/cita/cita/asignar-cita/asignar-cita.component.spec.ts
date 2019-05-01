import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCitaComponent } from './asignar-cita.component';

describe('AsignarCitaComponent', () => {
  let component: AsignarCitaComponent;
  let fixture: ComponentFixture<AsignarCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
