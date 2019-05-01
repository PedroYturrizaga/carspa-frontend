import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteServicioComponent } from './delete-servicio.component';

describe('DeleteServicioComponent', () => {
  let component: DeleteServicioComponent;
  let fixture: ComponentFixture<DeleteServicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteServicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
