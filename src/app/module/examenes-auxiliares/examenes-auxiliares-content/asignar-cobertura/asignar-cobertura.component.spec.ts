import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarCoberturaComponent } from './asignar-cobertura.component';

describe('AsignarCoberturaComponent', () => {
  let component: AsignarCoberturaComponent;
  let fixture: ComponentFixture<AsignarCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
