import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquinariasInactivoComponent } from './maquinarias-inactivo.component';

describe('MaquinariasInactivoComponent', () => {
  let component: MaquinariasInactivoComponent;
  let fixture: ComponentFixture<MaquinariasInactivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquinariasInactivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquinariasInactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
