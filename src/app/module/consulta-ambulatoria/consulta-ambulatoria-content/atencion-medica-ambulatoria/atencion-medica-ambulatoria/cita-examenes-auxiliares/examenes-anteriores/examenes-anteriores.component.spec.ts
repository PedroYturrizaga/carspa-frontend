import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesAnterioresComponent } from './examenes-anteriores.component';

describe('ExamenesAnterioresComponent', () => {
  let component: ExamenesAnterioresComponent;
  let fixture: ComponentFixture<ExamenesAnterioresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesAnterioresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesAnterioresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
