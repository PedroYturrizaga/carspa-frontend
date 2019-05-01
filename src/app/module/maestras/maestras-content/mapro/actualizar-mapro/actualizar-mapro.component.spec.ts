import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarMaproComponent } from './actualizar-mapro.component';

describe('ActualizarMaproComponent', () => {
  let component: ActualizarMaproComponent;
  let fixture: ComponentFixture<ActualizarMaproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarMaproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarMaproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
