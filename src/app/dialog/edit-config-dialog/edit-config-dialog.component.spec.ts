import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigDialogComponent } from './edit-config-dialog.component';

describe('EditConfigDialogComponent', () => {
  let component: EditConfigDialogComponent;
  let fixture: ComponentFixture<EditConfigDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConfigDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
