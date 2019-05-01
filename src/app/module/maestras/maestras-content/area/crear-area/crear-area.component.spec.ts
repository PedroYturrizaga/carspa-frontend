import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAreaComponent } from './crear-area.component';

describe('CrearAreaComponent', () => {
  let component: CrearAreaComponent;
  let fixture: ComponentFixture<CrearAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
