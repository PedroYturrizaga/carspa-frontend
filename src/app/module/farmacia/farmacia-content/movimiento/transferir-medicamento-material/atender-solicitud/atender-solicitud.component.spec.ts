import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtenderSolicitudComponent } from './atender-solicitud.component';

describe('AtenderSolicitudComponent', () => {
  let component: AtenderSolicitudComponent;
  let fixture: ComponentFixture<AtenderSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtenderSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtenderSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
