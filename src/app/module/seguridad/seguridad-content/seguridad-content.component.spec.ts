import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguridadContentComponent } from './seguridad-content.component';

describe('SeguridadContentComponent', () => {
  let component: SeguridadContentComponent;
  let fixture: ComponentFixture<SeguridadContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguridadContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguridadContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
