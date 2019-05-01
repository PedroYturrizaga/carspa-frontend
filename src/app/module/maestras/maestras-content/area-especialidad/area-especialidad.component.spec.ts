import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEspecialidadComponent } from './area-especialidad.component';

describe('AreaEspecialidadComponent', () => {
  let component: AreaEspecialidadComponent;
  let fixture: ComponentFixture<AreaEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
