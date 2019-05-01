import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioCoberturaComponent } from './servicio-cobertura.component';

describe('ServicioCoberturaComponent', () => {
  let component: ServicioCoberturaComponent;
  let fixture: ComponentFixture<ServicioCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicioCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicioCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
