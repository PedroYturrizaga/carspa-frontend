import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoAfectivoComponent } from './estado-afectivo.component';

describe('EstadoAfectivoComponent', () => {
  let component: EstadoAfectivoComponent;
  let fixture: ComponentFixture<EstadoAfectivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoAfectivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoAfectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
