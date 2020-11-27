import { Component, OnInit } from '@angular/core'
import { VehicleService } from './services/vehicle.service'
import { StatisticsService } from './services/statistics.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  state = {
    loading: true
  }

  constructor(private vehicleService: VehicleService, public statisticService: StatisticsService) {}

  async ngOnInit(): Promise<void> {
    await this.vehicleService.load()
    this.state.loading = false
  }

}
