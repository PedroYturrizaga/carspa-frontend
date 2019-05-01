import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarIafaComponent } from './asignar-iafa.component';

describe('AsignarIafaComponent', () => {
  let component: AsignarIafaComponent;
  let fixture: ComponentFixture<AsignarIafaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarIafaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarIafaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
