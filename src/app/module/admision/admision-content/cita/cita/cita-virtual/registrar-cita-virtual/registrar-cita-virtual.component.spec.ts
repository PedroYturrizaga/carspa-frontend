import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCitaVirtualComponent } from './registrar-cita-virtual.component';

describe('RegistrarCitaVirtualComponent', () => {
  let component: RegistrarCitaVirtualComponent;
  let fixture: ComponentFixture<RegistrarCitaVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCitaVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCitaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
