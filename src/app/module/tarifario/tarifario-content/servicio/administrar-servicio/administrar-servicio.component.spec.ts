import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarServicioComponent } from './administrar-servicio.component';

describe('AdministrarServicioComponent', () => {
  let component: AdministrarServicioComponent;
  let fixture: ComponentFixture<AdministrarServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
