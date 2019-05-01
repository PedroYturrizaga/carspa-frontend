import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDeleteComponent } from './personal-delete.component';

describe('PersonalDeleteComponent', () => {
  let component: PersonalDeleteComponent;
  let fixture: ComponentFixture<PersonalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
