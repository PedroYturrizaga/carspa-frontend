import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraContentComponent } from './compra-content.component';

describe('CompraContentComponent', () => {
  let component: CompraContentComponent;
  let fixture: ComponentFixture<CompraContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
