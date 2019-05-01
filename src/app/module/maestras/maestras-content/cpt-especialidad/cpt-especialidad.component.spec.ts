import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CptEspecialidadComponent } from './cpt-especialidad.component';

describe('CptEspecialidadComponent', () => {
  let component: CptEspecialidadComponent;
  let fixture: ComponentFixture<CptEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CptEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CptEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
