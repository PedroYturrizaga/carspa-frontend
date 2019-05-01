import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPacienteComponent } from './search-paciente.component';

describe('SearchPacienteComponent', () => {
  let component: SearchPacienteComponent;
  let fixture: ComponentFixture<SearchPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
