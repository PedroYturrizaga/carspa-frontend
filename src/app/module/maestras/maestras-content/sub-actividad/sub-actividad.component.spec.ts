import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubActividadComponent } from './sub-actividad.component';

describe('SubActividadComponent', () => {
  let component: SubActividadComponent;
  let fixture: ComponentFixture<SubActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
