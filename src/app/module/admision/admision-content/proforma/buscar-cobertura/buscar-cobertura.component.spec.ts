import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCoberturaComponent } from './buscar-cobertura.component';

describe('BuscarCoberturaComponent', () => {
  let component: BuscarCoberturaComponent;
  let fixture: ComponentFixture<BuscarCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
