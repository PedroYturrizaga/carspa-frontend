import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerActoMedicoComponent } from './ver-acto-medico.component';

describe('VerActoMedicoComponent', () => {
  let component: VerActoMedicoComponent;
  let fixture: ComponentFixture<VerActoMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerActoMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerActoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
