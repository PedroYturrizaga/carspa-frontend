import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAmbienteComponent } from './eliminar-ambiente.component';

describe('EliminarAmbienteComponent', () => {
  let component: EliminarAmbienteComponent;
  let fixture: ComponentFixture<EliminarAmbienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarAmbienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAmbienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
