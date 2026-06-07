import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTrendChartComponent } from './monthly-trend-chart.component';

describe('MonthlyTrendChartComponent', () => {
  let component: MonthlyTrendChartComponent;
  let fixture: ComponentFixture<MonthlyTrendChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyTrendChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyTrendChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
