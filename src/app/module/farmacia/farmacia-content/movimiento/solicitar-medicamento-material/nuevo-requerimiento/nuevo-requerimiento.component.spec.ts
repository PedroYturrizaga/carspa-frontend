import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRequerimientoComponent } from './nuevo-requerimiento.component';

describe('NuevoRequerimientoComponent', () => {
  let component: NuevoRequerimientoComponent;
  let fixture: ComponentFixture<NuevoRequerimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoRequerimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoRequerimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
