import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoSocioFamiliarComponent } from './estado-socio-familiar.component';

describe('EstadoSocioFamiliarComponent', () => {
  let component: EstadoSocioFamiliarComponent;
  let fixture: ComponentFixture<EstadoSocioFamiliarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoSocioFamiliarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoSocioFamiliarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
