import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevisualizarOrdenComponent } from './previsualizar-orden.component';

describe('PrevisualizarOrdenComponent', () => {
  let component: PrevisualizarOrdenComponent;
  let fixture: ComponentFixture<PrevisualizarOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevisualizarOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevisualizarOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
