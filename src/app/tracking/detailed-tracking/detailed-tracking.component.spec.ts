import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedTrackingComponent } from './detailed-tracking.component';

describe('DetailedTrackingComponent', () => {
  let component: DetailedTrackingComponent;
  let fixture: ComponentFixture<DetailedTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedTrackingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
