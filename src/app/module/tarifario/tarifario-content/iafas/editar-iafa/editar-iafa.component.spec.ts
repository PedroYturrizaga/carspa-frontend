import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIafaComponent } from './editar-iafa.component';

describe('EditarIafaComponent', () => {
  let component: EditarIafaComponent;
  let fixture: ComponentFixture<EditarIafaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarIafaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarIafaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
