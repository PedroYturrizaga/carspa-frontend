import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaquelComponent } from './anaquel.component';

describe('AnaquelComponent', () => {
  let component: AnaquelComponent;
  let fixture: ComponentFixture<AnaquelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaquelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaquelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
