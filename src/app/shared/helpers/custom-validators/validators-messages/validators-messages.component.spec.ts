import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorsMessagesComponent } from './validators-messages.component';

describe('ValidatorsMessagesComponent', () => {
  let component: ValidatorsMessagesComponent;
  let fixture: ComponentFixture<ValidatorsMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorsMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorsMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
