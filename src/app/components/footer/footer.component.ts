import { Component } from '@angular/core'
import { StatisticsService } from '../../services/statistics.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.styl']
})
export class FooterComponent {
  constructor(public statisticService: StatisticsService) { }

  showData(data: string): string[] {
    return data.split('\n')
  }
}

