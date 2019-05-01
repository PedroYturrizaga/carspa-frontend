import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoContentComponent } from './mantenimiento-content.component';

describe('MantenimientoContentComponent', () => {
  let component: MantenimientoContentComponent;
  let fixture: ComponentFixture<MantenimientoContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
