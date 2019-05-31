import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaMaterialComponent } from './salida-material.component';

describe('SalidaMaterialComponent', () => {
  let component: SalidaMaterialComponent;
  let fixture: ComponentFixture<SalidaMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidaMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidaMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
