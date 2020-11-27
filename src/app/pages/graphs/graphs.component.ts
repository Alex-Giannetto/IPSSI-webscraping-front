import { Component, OnDestroy, OnInit } from '@angular/core'
import { VehicleService } from '../../services/vehicle.service'
import { Router } from '@angular/router'
import { StatisticsService } from '../../services/statistics.service'
import { colors, StatisticInterface } from '../../interfaces/Statistic.interface'
import { VehicleInterface } from '../../interfaces/Vehicle.interface'

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.styl']
})
export class GraphsComponent implements OnInit, OnDestroy {

  constructor(private route: Router, private vehicleService: VehicleService, private statisticService: StatisticsService) { }

  ngOnInit(): void {
    switch (this.route.url) {
      case '/power-cost-ratio':
        return this.powerCostRatioInit()
      case '/price-brand':
        return this.pricePerBrand()
      case '/co2-fuel-ratio':
        return this.co2FuelRatioInit()
    }
  }

  ngOnDestroy(): void {
    this.statisticService.currentStatistic.next(null)
  }

  private powerCostRatioInit(): void {
    const brands = this.vehicleService.sortVehiclesPerBrands(vehicle => !vehicle.puissance || !vehicle.prix)
    const data = Object.keys(brands).map(brand => {
      let price = 0
      brands[brand].forEach(vehicle => price += parseFloat(`${vehicle.prix}`))
      let power = 0
      brands[brand].forEach(vehicle => power += parseFloat(`${vehicle.puissance}`))
      return (power / price) * 100
    })

    this.statisticService.currentStatistic.next({
      title: 'Ratio Prix / Puissance',
      data: [StatisticsService.getMinMaxDiff(brands, data)],
      dataSet: [
        {
          label: 'ratio',
          backgroundColor: colors[0],
          borderColor: colors[0],
          hoverBackgroundColor: colors[0],
          data
        }
      ],
      labels: Object.keys(brands)
    } as StatisticInterface)
  }

  private pricePerBrand(): void {
    const brands = this.vehicleService.sortVehiclesPerBrands(vehicle => !vehicle.prix)
    const data = Object.keys(brands).map(brandName => {
      const brandArray = brands[brandName]
      return brandArray.reduce((a, b) => a + parseFloat(`${b.prix}`), 0) / brandArray.length
    })

    this.statisticService.currentStatistic.next({
      title: 'Moyenne des prix par marques',
      data: [StatisticsService.getMinMaxDiff(brands, data)],
      dataSet: [
        {
          label: 'Moyenne',
          backgroundColor: colors[0],
          borderColor: colors[0],
          hoverBackgroundColor: colors[0],
          data
        }
      ],
      labels: Object.keys(brands)
    } as StatisticInterface)
  }

  private co2FuelRatioInit(): void {
    const fuelTypes: { [s: string]: VehicleInterface[] } = {}
    this.vehicleService.vehicles.getValue().map(vehicle => {
      if (!vehicle.carburant || vehicle.emission_co2 === null) {
        return
      }

      if (!fuelTypes[vehicle.carburant]) {
        fuelTypes[vehicle.carburant] = []
      }

      fuelTypes[vehicle.carburant].push(vehicle)
    })

    const data = Object.keys(fuelTypes).map(fueltypeName => {
      const fuelTypeArray = fuelTypes[fueltypeName]
      return fuelTypeArray.reduce((a, b) => a + parseFloat(`${b.emission_co2 || 0}`), 0) / fuelTypeArray.length
    })

    const diff = {
      labels: { Essence: fuelTypes.Essence, Diesel: fuelTypes.Diesel },
      values: [data[Object.keys(fuelTypes).indexOf('Essence')], data[Object.keys(fuelTypes).indexOf('Diesel')]]
    }

    this.statisticService.currentStatistic.next({
      title: 'Ratio Co2 / Carburant',
      data: [StatisticsService.getMinMaxDiff(diff.labels, diff.values)],
      dataSet: [
        {
          label: 'ratio',
          backgroundColor: colors[0],
          borderColor: colors[0],
          hoverBackgroundColor: colors[0],
          data
        }
      ],
      labels: Object.keys(fuelTypes)
    } as StatisticInterface)
  }
}
