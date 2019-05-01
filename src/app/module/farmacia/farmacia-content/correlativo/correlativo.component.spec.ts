import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrelativoComponent } from './correlativo.component';

describe('CorrelativoComponent', () => {
  let component: CorrelativoComponent;
  let fixture: ComponentFixture<CorrelativoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrelativoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrelativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
