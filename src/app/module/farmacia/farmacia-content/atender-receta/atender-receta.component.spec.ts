import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtenderRecetaComponent } from './atender-receta.component';

describe('AtenderRecetaComponent', () => {
  let component: AtenderRecetaComponent;
  let fixture: ComponentFixture<AtenderRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtenderRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtenderRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
