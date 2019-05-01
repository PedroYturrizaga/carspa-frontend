import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesAuxiliaresContentComponent } from './examenes-auxiliares-content.component';

describe('ExamenesAuxiliaresContentComponent', () => {
  let component: ExamenesAuxiliaresContentComponent;
  let fixture: ComponentFixture<ExamenesAuxiliaresContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesAuxiliaresContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesAuxiliaresContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
