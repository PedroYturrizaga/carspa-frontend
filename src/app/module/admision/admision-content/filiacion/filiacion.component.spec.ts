import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiliacionComponent } from './filiacion.component';

describe('FiliacionComponent', () => {
  let component: FiliacionComponent;
  let fixture: ComponentFixture<FiliacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiliacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
