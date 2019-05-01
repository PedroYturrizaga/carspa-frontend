import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UltimasAtencionesComponent } from './ultimas-atenciones.component';

describe('UltimasAtencionesComponent', () => {
  let component: UltimasAtencionesComponent;
  let fixture: ComponentFixture<UltimasAtencionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UltimasAtencionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UltimasAtencionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
