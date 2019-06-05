import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarOcComponent } from './visualizar-oc.component';

describe('VisualizarOcComponent', () => {
  let component: VisualizarOcComponent;
  let fixture: ComponentFixture<VisualizarOcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarOcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizarOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
