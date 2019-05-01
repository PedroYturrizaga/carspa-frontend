import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenContentComponent } from './almacen-content.component';

describe('AlmacenContentComponent', () => {
  let component: AlmacenContentComponent;
  let fixture: ComponentFixture<AlmacenContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
