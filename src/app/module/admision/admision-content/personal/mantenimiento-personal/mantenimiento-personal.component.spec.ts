import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoPersonalComponent } from './mantenimiento-personal.component';

describe('MantenimientoPersonalComponent', () => {
  let component: MantenimientoPersonalComponent;
  let fixture: ComponentFixture<MantenimientoPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
