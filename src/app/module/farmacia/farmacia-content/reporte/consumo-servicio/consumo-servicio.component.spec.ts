import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoServicioComponent } from './consumo-servicio.component';

describe('ConsumoServicioComponent', () => {
  let component: ConsumoServicioComponent;
  let fixture: ComponentFixture<ConsumoServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumoServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumoServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
