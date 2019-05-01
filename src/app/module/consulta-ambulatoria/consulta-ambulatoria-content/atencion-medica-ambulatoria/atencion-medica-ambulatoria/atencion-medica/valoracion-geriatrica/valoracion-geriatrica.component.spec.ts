import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoracionGeriatricaComponent } from './valoracion-geriatrica.component';

describe('ValoracionGeriatricaComponent', () => {
  let component: ValoracionGeriatricaComponent;
  let fixture: ComponentFixture<ValoracionGeriatricaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoracionGeriatricaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoracionGeriatricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
