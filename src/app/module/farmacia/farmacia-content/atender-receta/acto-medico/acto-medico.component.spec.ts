import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActoMedicoComponent } from './acto-medico.component';

describe('ActoMedicoComponent', () => {
  let component: ActoMedicoComponent;
  let fixture: ComponentFixture<ActoMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActoMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActoMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
