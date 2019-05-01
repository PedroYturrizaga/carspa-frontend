import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarEditarConvenioComponent } from './insertar-editar-convenio.component';

describe('InsertarEditarConvenioComponent', () => {
  let component: InsertarEditarConvenioComponent;
  let fixture: ComponentFixture<InsertarEditarConvenioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarEditarConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarEditarConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
