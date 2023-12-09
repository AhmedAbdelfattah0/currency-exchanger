import { BaseComponent } from 'src/app/base-components/base.component';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Chart from 'chart.js/auto';
import { environment } from 'src/environments/environment';
import { ChartService } from 'src/app/shared/services/chart.service';
import { takeUntil } from 'rxjs';
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent extends BaseComponent implements OnInit, OnChanges {
  @Input() toCurrency: any;
  data: any;
  chartValues: any[] = [];

  constructor(private chartService: ChartService) {
    super();
    this.chartService.conventionHistorySubject
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((res: any) => {
        if (res && res.length) {
          this.chartValues = res.map(
            (item: any) => item.rates[this.toCurrency]
          );
          this.renderChart();
        }
      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.toCurrency)
      this.chartService.getHistoryForLastYear(
        environment.base,
        this.toCurrency
      );
  }

  ngOnInit(): void {
    this.toCurrency = 'USD';
    this.chartService.getHistoryForLastYear(environment.base, this.toCurrency);
  }
  renderChart() {
    const myChart = new Chart('lineChart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Mounthly currancy',
            data: this.chartValues,

            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category',
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            labels: this.chartValues,
            title: {
              display: true,
              text: 'Rates',
            },
            ticks: {
              stepSize: 10,
              maxTicksLimit: 200,
            },
          },
        },
      },
    });
  }
}
