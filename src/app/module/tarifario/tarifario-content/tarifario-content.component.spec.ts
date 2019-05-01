import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifarioContentComponent } from './tarifario-content.component';

describe('TarifarioContentComponent', () => {
  let component: TarifarioContentComponent;
  let fixture: ComponentFixture<TarifarioContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifarioContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifarioContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
