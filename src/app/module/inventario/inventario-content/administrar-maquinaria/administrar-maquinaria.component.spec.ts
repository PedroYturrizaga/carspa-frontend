import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrarMaquinariaComponent } from './administrar-maquinaria.component';

describe('AdministrarMaquinariaComponent', () => {
  let component: AdministrarMaquinariaComponent;
  let fixture: ComponentFixture<AdministrarMaquinariaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrarMaquinariaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrarMaquinariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
