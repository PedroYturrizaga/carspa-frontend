import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlarStockComponent } from './controlar-stock.component';

describe('ControlarStockComponent', () => {
  let component: ControlarStockComponent;
  let fixture: ComponentFixture<ControlarStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlarStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
