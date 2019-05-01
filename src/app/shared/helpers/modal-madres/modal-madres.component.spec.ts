import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMadresComponent } from './modal-madres.component';

describe('ModalMadresComponent', () => {
  let component: ModalMadresComponent;
  let fixture: ComponentFixture<ModalMadresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMadresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMadresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
