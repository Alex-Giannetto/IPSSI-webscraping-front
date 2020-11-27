import { Component } from '@angular/core'
import { StatisticsService } from '../../services/statistics.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent {
  pages: { label: string, link: string }[] = [
    { label: 'Liste des vehicules', link: 'vehicle-list' },
    { label: 'Ratio Prix/Puissance', link: 'power-cost-ratio' },
    { label: 'Moyenne des prix par marques', link: 'price-brand' },
    { label: 'Ratio Co2/Carburant', link: 'co2-fuel-ratio' },
    { label: 'Coût annuel estimé', link: 'annual-cost' }
  ]

  constructor(public statisticService: StatisticsService) {}

  showData(data: string): string[] {
    return data.split('\n')
  }
}
