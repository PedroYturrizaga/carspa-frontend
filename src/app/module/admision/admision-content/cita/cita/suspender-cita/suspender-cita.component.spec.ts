import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspenderCitaComponent } from './suspender-cita.component';

describe('SuspenderCitaComponent', () => {
  let component: SuspenderCitaComponent;
  let fixture: ComponentFixture<SuspenderCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspenderCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspenderCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
