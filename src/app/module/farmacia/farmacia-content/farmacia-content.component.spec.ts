import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmaciaContentComponent } from './farmacia-content.component';

describe('FarmaciaContentComponent', () => {
  let component: FarmaciaContentComponent;
  let fixture: ComponentFixture<FarmaciaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmaciaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmaciaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
