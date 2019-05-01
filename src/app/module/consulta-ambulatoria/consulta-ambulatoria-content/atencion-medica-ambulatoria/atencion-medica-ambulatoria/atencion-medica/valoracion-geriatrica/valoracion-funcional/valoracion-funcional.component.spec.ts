import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionFuncionalComponent } from './valoracion-funcional.component';

describe('ValoracionFuncionalComponent', () => {
  let component: ValoracionFuncionalComponent;
  let fixture: ComponentFixture<ValoracionFuncionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoracionFuncionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoracionFuncionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
