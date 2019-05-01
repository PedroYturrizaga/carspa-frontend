import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionMedicaComponent } from './atencion-medica.component';

describe('AtencionMedicaComponent', () => {
  let component: AtencionMedicaComponent;
  let fixture: ComponentFixture<AtencionMedicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtencionMedicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionMedicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
