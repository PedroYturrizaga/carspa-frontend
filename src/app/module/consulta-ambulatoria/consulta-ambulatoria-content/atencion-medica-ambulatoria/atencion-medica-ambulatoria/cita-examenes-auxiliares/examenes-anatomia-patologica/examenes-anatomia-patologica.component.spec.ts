import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesAnatomiaPatologicaComponent } from './examenes-anatomia-patologica.component';

describe('ExamenesAnatomiaPatologicaComponent', () => {
  let component: ExamenesAnatomiaPatologicaComponent;
  let fixture: ComponentFixture<ExamenesAnatomiaPatologicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamenesAnatomiaPatologicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesAnatomiaPatologicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
