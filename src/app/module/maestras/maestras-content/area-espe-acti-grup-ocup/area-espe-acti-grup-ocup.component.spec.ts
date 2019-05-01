import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaEspeActiGrupOcupComponent } from './area-espe-acti-grup-ocup.component';

describe('AreaEspeActiGrupOcupComponent', () => {
  let component: AreaEspeActiGrupOcupComponent;
  let fixture: ComponentFixture<AreaEspeActiGrupOcupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaEspeActiGrupOcupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaEspeActiGrupOcupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
