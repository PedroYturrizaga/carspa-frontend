import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCierreCajaComponent } from './reporte-cierre-caja.component';

describe('ReporteCierreCajaComponent', () => {
  let component: ReporteCierreCajaComponent;
  let fixture: ComponentFixture<ReporteCierreCajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteCierreCajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteCierreCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
