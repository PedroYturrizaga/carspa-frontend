import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenderComponent } from './suspender.component';

describe('SuspenderComponent', () => {
  let component: SuspenderComponent;
  let fixture: ComponentFixture<SuspenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
