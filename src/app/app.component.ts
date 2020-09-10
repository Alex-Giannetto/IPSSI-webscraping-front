import { Component, OnInit } from '@angular/core'
import { environment } from '../environments/environment'
import { StatisticsService } from './services/statistics.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  constructor(public statisticService: StatisticsService) {}

  async ngOnInit(): Promise<void> {
    this.statisticService.onChange.subscribe(statistic => this.statisticService.currentStatistic = statistic)
    await this.statisticService.load(environment.graphs)
  }

}
