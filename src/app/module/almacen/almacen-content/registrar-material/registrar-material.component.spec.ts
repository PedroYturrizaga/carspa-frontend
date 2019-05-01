import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMaterialComponent } from './registrar-material.component';

describe('RegistrarMaterialComponent', () => {
  let component: RegistrarMaterialComponent;
  let fixture: ComponentFixture<RegistrarMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
