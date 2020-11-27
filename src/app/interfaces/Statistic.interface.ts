import { ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts'

export class StatisticInterface {
  title: string
  dataSet: ChartDataSets[]
  labels: Label[]
  data: string[]
}

export const colors = ['#e7444b', '#D9198B', '#00D394']
