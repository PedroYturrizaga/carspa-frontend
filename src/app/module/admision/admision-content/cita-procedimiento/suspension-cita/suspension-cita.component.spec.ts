import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspensionCitaComponent } from './suspension-cita.component';

describe('SuspensionCitaComponent', () => {
  let component: SuspensionCitaComponent;
  let fixture: ComponentFixture<SuspensionCitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuspensionCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuspensionCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
