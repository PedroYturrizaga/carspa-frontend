import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesInactivoComponent } from './materiales-inactivo.component';

describe('MaterialesInactivoComponent', () => {
  let component: MaterialesInactivoComponent;
  let fixture: ComponentFixture<MaterialesInactivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialesInactivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialesInactivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
