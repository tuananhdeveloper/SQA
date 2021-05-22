import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryConfigComponent } from './history-config.component';

describe('HistoryConfigComponent', () => {
  let component: HistoryConfigComponent;
  let fixture: ComponentFixture<HistoryConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
