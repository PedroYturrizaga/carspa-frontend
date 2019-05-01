import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InveInicialComponent } from './inve-inicial.component';

describe('InveInicialComponent', () => {
  let component: InveInicialComponent;
  let fixture: ComponentFixture<InveInicialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InveInicialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InveInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
