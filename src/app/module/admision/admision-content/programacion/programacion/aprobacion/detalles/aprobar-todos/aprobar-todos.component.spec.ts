import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarTodosComponent } from './aprobar-todos.component';

describe('AprobarTodosComponent', () => {
  let component: AprobarTodosComponent;
  let fixture: ComponentFixture<AprobarTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprobarTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprobarTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
