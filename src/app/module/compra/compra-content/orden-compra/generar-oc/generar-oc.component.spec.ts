import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarOcComponent } from './generar-oc.component';

describe('GenerarOcComponent', () => {
  let component: GenerarOcComponent;
  let fixture: ComponentFixture<GenerarOcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarOcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
