import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentesPatologicosComponent } from './antecedentes-patologicos.component';

describe('AntecedentesPatologicosComponent', () => {
  let component: AntecedentesPatologicosComponent;
  let fixture: ComponentFixture<AntecedentesPatologicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntecedentesPatologicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentesPatologicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
