import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActoMedicoCitaComponent } from './acto-medico-cita.component';

describe('ActoMedicoCitaComponent', () => {
  let component: ActoMedicoCitaComponent;
  let fixture: ComponentFixture<ActoMedicoCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActoMedicoCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActoMedicoCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
