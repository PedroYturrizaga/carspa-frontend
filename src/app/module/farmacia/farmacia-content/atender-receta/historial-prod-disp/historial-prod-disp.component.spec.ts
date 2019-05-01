import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialProdDispComponent } from './historial-prod-disp.component';

describe('HistorialProdDispComponent', () => {
  let component: HistorialProdDispComponent;
  let fixture: ComponentFixture<HistorialProdDispComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialProdDispComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialProdDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
