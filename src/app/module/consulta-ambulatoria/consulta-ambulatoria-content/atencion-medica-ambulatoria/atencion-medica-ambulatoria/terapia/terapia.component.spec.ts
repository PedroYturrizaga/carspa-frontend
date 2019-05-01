import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerapiaComponent } from './terapia.component';

describe('TerapiaComponent', () => {
  let component: TerapiaComponent;
  let fixture: ComponentFixture<TerapiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerapiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerapiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
