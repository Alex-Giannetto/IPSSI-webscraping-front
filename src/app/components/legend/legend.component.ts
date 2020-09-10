import { Component, Input, OnInit } from '@angular/core'
import { ChartDataSets } from 'chart.js'

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.styl']
})
export class LegendComponent {

  @Input() dataSets: ChartDataSets[] = []

}
