import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoOcupacionalComponent } from './grupo-ocupacional.component';

describe('GrupoOcupacionalComponent', () => {
  let component: GrupoOcupacionalComponent;
  let fixture: ComponentFixture<GrupoOcupacionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoOcupacionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoOcupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
