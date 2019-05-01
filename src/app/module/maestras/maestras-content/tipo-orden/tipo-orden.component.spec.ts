import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoOrdenComponent } from './tipo-orden.component';

describe('TipoOrdenComponent', () => {
  let component: TipoOrdenComponent;
  let fixture: ComponentFixture<TipoOrdenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoOrdenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
