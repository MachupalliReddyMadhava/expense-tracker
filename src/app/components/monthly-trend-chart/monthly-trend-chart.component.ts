import {
  Component,
  Input,
  OnChanges,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

@Component({
  selector: 'app-monthly-trend-chart',
  standalone: true,
  imports: [],
  templateUrl:
    './monthly-trend-chart.component.html',
  styleUrl:
    './monthly-trend-chart.component.css'
})
export class MonthlyTrendChartComponent
implements OnChanges {

  @Input()
  data: { [key: string]: number } = {};

  @ViewChild('lineCanvas')
  lineCanvas!: ElementRef;

  chart: Chart | undefined;

  ngOnChanges(): void {

    this.renderChart();

  }

  ngAfterViewInit(): void {

    this.renderChart();

  }

  renderChart(): void {

    if (!this.lineCanvas) {
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(
      this.lineCanvas.nativeElement,
      {

        type: 'line',

        data: {

          labels:
            Object.keys(this.data),

          datasets: [
  {
    label: 'Monthly Expenses',

    data: Object.values(this.data),

    borderColor: '#1976d2',

    backgroundColor: 'rgba(25,118,210,0.2)',

    borderWidth: 3,

    tension: 0.4,

    fill: true,

    pointRadius: 6,

    pointHoverRadius: 8,

    pointBackgroundColor: '#1976d2'
  }
]

        },

        options: {

  responsive: true,

  maintainAspectRatio: false,

  plugins: {

    legend: {

      position: 'top'

    }

  },

  scales: {

    y: {

      beginAtZero: true

    }

  }

}

      }
    );

  }

}