import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesAnatomiaPatologicaDeleteComponent } from './examenes-anatomia-patologica-delete.component';

describe('ExamenesAnatomiaPatologicaDeleteComponent', () => {
  let component: ExamenesAnatomiaPatologicaDeleteComponent;
  let fixture: ComponentFixture<ExamenesAnatomiaPatologicaDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesAnatomiaPatologicaDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesAnatomiaPatologicaDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
