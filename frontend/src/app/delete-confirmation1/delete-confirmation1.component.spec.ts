import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteConfirmation1Component } from './delete-confirmation1.component';

describe('DeleteConfirmation1Component', () => {
  let component: DeleteConfirmation1Component;
  let fixture: ComponentFixture<DeleteConfirmation1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteConfirmation1Component]
    });
    fixture = TestBed.createComponent(DeleteConfirmation1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
