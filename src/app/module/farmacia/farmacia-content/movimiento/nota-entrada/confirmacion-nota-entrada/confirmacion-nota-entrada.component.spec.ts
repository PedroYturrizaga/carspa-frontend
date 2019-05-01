import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionNotaEntradaComponent } from './confirmacion-nota-entrada.component';

describe('ConfirmacionNotaEntradaComponent', () => {
  let component: ConfirmacionNotaEntradaComponent;
  let fixture: ComponentFixture<ConfirmacionNotaEntradaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmacionNotaEntradaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmacionNotaEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
