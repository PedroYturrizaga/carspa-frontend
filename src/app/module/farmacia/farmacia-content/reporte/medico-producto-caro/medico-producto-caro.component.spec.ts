import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoProductoCaroComponent } from './medico-producto-caro.component';

describe('MedicoProductoCaroComponent', () => {
  let component: MedicoProductoCaroComponent;
  let fixture: ComponentFixture<MedicoProductoCaroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoProductoCaroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoProductoCaroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
