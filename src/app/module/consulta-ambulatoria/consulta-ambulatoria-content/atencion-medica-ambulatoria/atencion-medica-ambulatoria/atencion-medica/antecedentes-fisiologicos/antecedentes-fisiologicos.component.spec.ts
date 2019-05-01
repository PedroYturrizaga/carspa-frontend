import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesFisiologicosComponent } from './antecedentes-fisiologicos.component';

describe('AntecedentesFisiologicosComponent', () => {
  let component: AntecedentesFisiologicosComponent;
  let fixture: ComponentFixture<AntecedentesFisiologicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntecedentesFisiologicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesFisiologicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
