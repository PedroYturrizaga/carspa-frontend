import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaContentComponent } from './caja-content.component';

describe('CajaContentComponent', () => {
  let component: CajaContentComponent;
  let fixture: ComponentFixture<CajaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
