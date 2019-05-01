import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTurnoComponent } from './add-turno.component';

describe('AddTurnoComponent', () => {
  let component: AddTurnoComponent;
  let fixture: ComponentFixture<AddTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
