import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarCoberturaComponent } from './eliminar-cobertura.component';

describe('EliminarCoberturaComponent', () => {
  let component: EliminarCoberturaComponent;
  let fixture: ComponentFixture<EliminarCoberturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarCoberturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarCoberturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
