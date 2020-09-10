import { Component } from '@angular/core'
import { StatisticsService } from '../../services/statistics.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent {
  constructor(public statisticService: StatisticsService) {}

  getYears(): number[] {
    const currentYear = new Date().getFullYear()
    const years: number[] = []
    for (let i = currentYear - 6; i >= 1990; i--) {
      years.push(i)
    }
    return years
  }

  showData(data: string): string[] {
    return data.split('\n')
  }

  async changeYear(event): Promise<void> {
    const year = event.target.value
    const statistic = await this.statisticService.getData({
      url: this.statisticService.currentStatistic.url,
      yearSelector: year
    })
    this.statisticService.onChange.emit(statistic)
  }
}
