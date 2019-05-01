import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaDatosComponent } from './persona-datos.component';

describe('PersonaDatosComponent', () => {
  let component: PersonaDatosComponent;
  let fixture: ComponentFixture<PersonaDatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaDatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
