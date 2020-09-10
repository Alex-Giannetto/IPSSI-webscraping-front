import { Component } from '@angular/core'
import { StatisticsService } from '../../services/statistics.service'
import { StatisticInterface } from '../../interfaces/Statistic.interface'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent {
  constructor(public statisticService: StatisticsService) {}

  getYears(): number[] {
    const years: number[] = []
    for (let i = 1985; i <= 2014; i++) {
      years.push(i)
    }
    return years
  }

  showData(data: string): string[] {
    const regex = RegExp(/([+-][0-9. %]*) (.*)/g)
    return regex.exec(data)
  }
}
