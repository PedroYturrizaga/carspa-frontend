import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoAtencionComponent } from './resultado-atencion.component';

describe('ResultadoAtencionComponent', () => {
  let component: ResultadoAtencionComponent;
  let fixture: ComponentFixture<ResultadoAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
