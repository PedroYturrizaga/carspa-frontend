import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarConvenioComponent } from './eliminar-convenio.component';

describe('EliminarConvenioComponent', () => {
  let component: EliminarConvenioComponent;
  let fixture: ComponentFixture<EliminarConvenioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
