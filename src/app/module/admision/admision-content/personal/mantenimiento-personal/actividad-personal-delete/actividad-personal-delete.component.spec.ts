import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadPersonalDeleteComponent } from './actividad-personal-delete.component';

describe('ActividadPersonalDeleteComponent', () => {
  let component: ActividadPersonalDeleteComponent;
  let fixture: ComponentFixture<ActividadPersonalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadPersonalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadPersonalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
