import { Component } from '@angular/core'
import { ChartOptions } from 'chart.js'
import { StatisticsService } from '../../services/statistics.service'

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.styl']
})
export class GraphicComponent {

  barChartOptions: ChartOptions = {
    responsive: true, maintainAspectRatio: false, scales: {
      xAxes: [{ gridLines: { color: '#232850' } }],
      yAxes: [{ id: 'y-0', gridLines: { color: '#232850' }, ticks: { beginAtZero: true } }]
    }
  }

  constructor(public statisticService: StatisticsService) {}
}
