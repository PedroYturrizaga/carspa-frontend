import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FijarPrecioComponent } from './fijar-precio.component';

describe('FijarPrecioComponent', () => {
  let component: FijarPrecioComponent;
  let fixture: ComponentFixture<FijarPrecioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FijarPrecioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FijarPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
