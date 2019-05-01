import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvePorTurnoComponent } from './inve-por-turno.component';

describe('InvePorTurnoComponent', () => {
  let component: InvePorTurnoComponent;
  let fixture: ComponentFixture<InvePorTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvePorTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvePorTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
