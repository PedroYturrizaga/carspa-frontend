import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAnaquelComponent } from './registrar-anaquel.component';

describe('RegistrarAnaquelComponent', () => {
  let component: RegistrarAnaquelComponent;
  let fixture: ComponentFixture<RegistrarAnaquelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarAnaquelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarAnaquelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
