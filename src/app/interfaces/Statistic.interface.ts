import { ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts'

export class StatisticInterface {
  title: string
  url: string
  dataSet: ChartDataSets[]
  labels: Label[]
  data: string[]
  yearSelector?: boolean
}

export const colors = ['#00D394', '#D9198B']
