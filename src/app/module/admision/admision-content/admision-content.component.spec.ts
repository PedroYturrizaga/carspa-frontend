import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmisionContentComponent } from './admision-content.component';

describe('AdmisionContentComponent', () => {
  let component: AdmisionContentComponent;
  let fixture: ComponentFixture<AdmisionContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmisionContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmisionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
