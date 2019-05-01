import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizarDiarioComponent } from './regularizar-diario.component';

describe('RegularizarDiarioComponent', () => {
  let component: RegularizarDiarioComponent;
  let fixture: ComponentFixture<RegularizarDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegularizarDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegularizarDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
