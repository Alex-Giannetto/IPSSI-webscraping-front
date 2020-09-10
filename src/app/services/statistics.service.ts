import { EventEmitter, Injectable } from '@angular/core'
import { colors, StatisticInterface } from '../interfaces/Statistic.interface'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  statistics: StatisticInterface[] = []
  currentStatistic: StatisticInterface = null

  onChange: EventEmitter<StatisticInterface> = new EventEmitter<StatisticInterface>()

  constructor(private httpClient: HttpClient) {}

  async load(graphics: { url: string, yearSelector?: number | string }[]): Promise<boolean> {
    if (graphics.length === 0) {
      return Promise.resolve(true)
    }
    const statistic = await this.getData(graphics[0])

    if (!this.currentStatistic) {
      this.onChange.emit(statistic)
    }

    this.statistics.push(statistic)
    graphics.shift()
    return this.load(graphics)
  }

  async getData(data: { url: string, yearSelector?: number | string }): Promise<StatisticInterface> {
    try {

      const resolve: any = await this.httpClient.get(data.url + (data.yearSelector ?? '')).toPromise()

      const statistic: StatisticInterface = {
        title: resolve.title,
        url: data.url,
        yearSelector: data.yearSelector,
        dataSet: resolve.chart.data.map((chart, index) => ({
          data: chart.value, label: chart.label, borderColor: colors[index], fill: false, yAxisID: `y-${index}`
        })),
        labels: resolve.chart.labels,
        data: resolve.data
      }

      return Promise.resolve(statistic)
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
