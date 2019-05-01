import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarMaterialComponent } from './administrar-material.component';

describe('AdministrarMaterialComponent', () => {
  let component: AdministrarMaterialComponent;
  let fixture: ComponentFixture<AdministrarMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
