import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaVirtualComponent } from './cita-virtual.component';

describe('CitaVirtualComponent', () => {
  let component: CitaVirtualComponent;
  let fixture: ComponentFixture<CitaVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitaVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
