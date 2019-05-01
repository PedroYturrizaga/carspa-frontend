import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCognitivoComponent } from './estado-cognitivo.component';

describe('EstadoCognitivoComponent', () => {
  let component: EstadoCognitivoComponent;
  let fixture: ComponentFixture<EstadoCognitivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoCognitivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCognitivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
