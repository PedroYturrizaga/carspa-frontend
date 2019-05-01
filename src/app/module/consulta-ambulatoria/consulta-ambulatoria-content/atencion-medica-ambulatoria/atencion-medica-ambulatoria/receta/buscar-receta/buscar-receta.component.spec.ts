import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarRecetaComponent } from './buscar-receta.component';

describe('BuscarRecetaComponent', () => {
  let component: BuscarRecetaComponent;
  let fixture: ComponentFixture<BuscarRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
