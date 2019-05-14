import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistActuaComponent } from './regist-actua.component';

describe('RegistActuaComponent', () => {
  let component: RegistActuaComponent;
  let fixture: ComponentFixture<RegistActuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistActuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistActuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
