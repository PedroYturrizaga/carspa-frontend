import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAeagpComponent } from './eliminar-aeagp.component';

describe('EliminarAeagpComponent', () => {
  let component: EliminarAeagpComponent;
  let fixture: ComponentFixture<EliminarAeagpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarAeagpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAeagpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
