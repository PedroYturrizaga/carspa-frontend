import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalizacionContentComponent } from './hospitalizacion-content.component';

describe('HospitalizacionContentComponent', () => {
  let component: HospitalizacionContentComponent;
  let fixture: ComponentFixture<HospitalizacionContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalizacionContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalizacionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
