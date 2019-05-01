import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalContratanteComponent } from './personal-contratante.component';

describe('PersonalContratanteComponent', () => {
  let component: PersonalContratanteComponent;
  let fixture: ComponentFixture<PersonalContratanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalContratanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
