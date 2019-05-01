import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCitaComponent } from './select-cita.component';

describe('SelectCitaComponent', () => {
  let component: SelectCitaComponent;
  let fixture: ComponentFixture<SelectCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
