import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoProgramacionComponent } from './listado-programacion.component';

describe('ListadoProgramacionComponent', () => {
  let component: ListadoProgramacionComponent;
  let fixture: ComponentFixture<ListadoProgramacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoProgramacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoProgramacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
