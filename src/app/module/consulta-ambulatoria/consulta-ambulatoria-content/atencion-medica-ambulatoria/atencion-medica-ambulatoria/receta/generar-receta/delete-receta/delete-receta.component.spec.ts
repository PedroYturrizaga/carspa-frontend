import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecetaComponent } from './delete-receta.component';

describe('DeleteRecetaComponent', () => {
  let component: DeleteRecetaComponent;
  let fixture: ComponentFixture<DeleteRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
