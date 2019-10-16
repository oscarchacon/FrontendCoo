import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaveTaskComponent } from './modal-save-task.component';

describe('ModalSaveTaskComponent', () => {
  let component: ModalSaveTaskComponent;
  let fixture: ComponentFixture<ModalSaveTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSaveTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSaveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
