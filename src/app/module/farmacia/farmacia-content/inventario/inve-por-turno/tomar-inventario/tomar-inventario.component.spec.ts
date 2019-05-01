import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TomarInventarioComponent } from './tomar-inventario.component';

describe('TomarInventarioComponent', () => {
  let component: TomarInventarioComponent;
  let fixture: ComponentFixture<TomarInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TomarInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TomarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
