import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarRecetaComponent } from './generar-receta.component';

describe('GenerarRecetaComponent', () => {
  let component: GenerarRecetaComponent;
  let fixture: ComponentFixture<GenerarRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
