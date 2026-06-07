import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  PieController,
  ArcElement,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-expense-chart',
  standalone: true,
  imports: [],
  templateUrl: './expense-chart.component.html',
  styleUrl: './expense-chart.component.css'
})
export class ExpenseChartComponent
implements OnChanges {

  @Input()
  data: { [key: string]: number } = {};

  @ViewChild('pieCanvas')
  pieCanvas!: ElementRef;

  chart: Chart | undefined;

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['data']
      &&
      this.pieCanvas
    ) {

      this.renderChart();

    }

  }

  ngAfterViewInit(): void {

    this.renderChart();

  }

  renderChart(): void {

    if (!this.pieCanvas) {
      return;
    }

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(
      this.pieCanvas.nativeElement,
      {
  type: 'pie',

  data: {
    labels: Object.keys(this.data),

    datasets: [
      {
        data: Object.values(this.data),

        backgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  },

  options: {

    responsive: true,

    maintainAspectRatio: false

  }

}
    );

  }

}