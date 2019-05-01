import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcreditaComponent } from './acredita.component';

describe('AcreditaComponent', () => {
  let component: AcreditaComponent;
  let fixture: ComponentFixture<AcreditaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcreditaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcreditaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
