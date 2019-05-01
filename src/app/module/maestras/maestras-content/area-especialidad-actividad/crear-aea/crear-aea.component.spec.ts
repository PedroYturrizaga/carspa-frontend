import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAeaComponent } from './crear-aea.component';

describe('CrearAeaComponent', () => {
  let component: CrearAeaComponent;
  let fixture: ComponentFixture<CrearAeaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAeaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAeaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
