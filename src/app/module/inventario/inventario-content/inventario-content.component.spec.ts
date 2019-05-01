import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioContentComponent } from './inventario-content.component';

describe('InventarioContentComponent', () => {
  let component: InventarioContentComponent;
  let fixture: ComponentFixture<InventarioContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
