import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaproComponent } from './mapro.component';

describe('MaproComponent', () => {
  let component: MaproComponent;
  let fixture: ComponentFixture<MaproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
