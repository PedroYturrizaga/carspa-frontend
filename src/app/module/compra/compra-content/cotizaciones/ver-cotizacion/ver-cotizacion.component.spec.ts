import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCotizacionComponent } from './ver-cotizacion.component';

describe('VerCotizacionComponent', () => {
  let component: VerCotizacionComponent;
  let fixture: ComponentFixture<VerCotizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCotizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCotizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
