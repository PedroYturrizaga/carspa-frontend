import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoRecetaComponent } from './producto-receta.component';

describe('ProductoRecetaComponent', () => {
  let component: ProductoRecetaComponent;
  let fixture: ComponentFixture<ProductoRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
