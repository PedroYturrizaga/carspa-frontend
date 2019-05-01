import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoAnaquelComponent } from './mantenimiento-anaquel.component';

describe('MantenimientoAnaquelComponent', () => {
  let component: MantenimientoAnaquelComponent;
  let fixture: ComponentFixture<MantenimientoAnaquelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoAnaquelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoAnaquelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
