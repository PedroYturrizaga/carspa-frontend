import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IafasComponent } from './iafas.component';

describe('IafasComponent', () => {
  let component: IafasComponent;
  let fixture: ComponentFixture<IafasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IafasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IafasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
