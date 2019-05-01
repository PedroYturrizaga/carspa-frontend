import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaestrasContentComponent } from './maestras-content.component';

describe('MaestrasContentComponent', () => {
  let component: MaestrasContentComponent;
  let fixture: ComponentFixture<MaestrasContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaestrasContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaestrasContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
