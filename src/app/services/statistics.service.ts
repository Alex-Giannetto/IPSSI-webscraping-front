import { Injectable } from '@angular/core'
import { StatisticInterface } from '../interfaces/Statistic.interface'
import { BehaviorSubject } from 'rxjs'
import { VehicleInterface } from '../interfaces/Vehicle.interface'

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  statistics: StatisticInterface[] = []
  currentStatistic: BehaviorSubject<StatisticInterface> = new BehaviorSubject<StatisticInterface>(null)

  static getMinMaxDiff(brands: { [s: string]: VehicleInterface[] }, data: number[]): string {
    const min = {
      value: Math.min(...data),
      label: Object.keys(brands)[data.indexOf(Math.min(...data))]
    }

    const max = {
      value: Math.max(...data),
      label: Object.keys(brands)[data.indexOf(Math.max(...data))]
    }

    const diff = Math.round(((max.value - min.value) / min.value) * 100)
    return `+ ${diff}%\n${min.label} - ${max.label}`
  }

}
