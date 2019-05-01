import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaAtendidaNoAtendidaComponent } from './receta-atendida-no-atendida.component';

describe('RecetaAtendidaNoAtendidaComponent', () => {
  let component: RecetaAtendidaNoAtendidaComponent;
  let fixture: ComponentFixture<RecetaAtendidaNoAtendidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecetaAtendidaNoAtendidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaAtendidaNoAtendidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
