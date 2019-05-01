import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarContratanteComponent } from './eliminar-contratante.component';

describe('EliminarContratanteComponent', () => {
  let component: EliminarContratanteComponent;
  let fixture: ComponentFixture<EliminarContratanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarContratanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarContratanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
