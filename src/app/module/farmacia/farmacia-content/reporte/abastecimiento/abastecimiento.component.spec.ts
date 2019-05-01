import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbastecimientoComponent } from './abastecimiento.component';

describe('AbastecimientoComponent', () => {
  let component: AbastecimientoComponent;
  let fixture: ComponentFixture<AbastecimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbastecimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbastecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
