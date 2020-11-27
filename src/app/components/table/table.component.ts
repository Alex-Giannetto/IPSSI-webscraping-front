import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.styl']
})
export class TableComponent {
  @Input() data: any[] = []
  @Input() columns: { property: string, displayName?: string, suffix?: string, type?: 'image' | 'link' }[] = []

  sortConfig = {
    label: '',
    order: true
  }

  sort(label): void {
    this.sortConfig = {
      label,
      order: this.sortConfig.label === label ? !this.sortConfig.order : true
    }

    this.data = this.data.sort((a, b) => {
      const aValue = !isNaN(parseFloat(a[label] || 0)) ? parseFloat(a[label] || 0) : (a[label] ?? 'zzzzzzzzzzz')
      const bValue = !isNaN(parseFloat(b[label] || 0)) ? parseFloat(b[label] || 0) : (b[label] ?? 'zzzzzzzzzzz')

      if (aValue > bValue) {
        return this.sortConfig.order ? 1 : -1
      }

      return this.sortConfig.order ? -1 : 1
    })
  }

  getSortIcon(label: string): 'sort' | 'sort-up' | 'sort-down' {
    if (this.sortConfig.label !== label) {
      return 'sort'
    }
    return this.sortConfig.order ? 'sort-down' : 'sort-up'
  }

}
