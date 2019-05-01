import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearIafaComponent } from './crear-iafa.component';

describe('CrearIafaComponent', () => {
  let component: CrearIafaComponent;
  let fixture: ComponentFixture<CrearIafaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearIafaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearIafaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
