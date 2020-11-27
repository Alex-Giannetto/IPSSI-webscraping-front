import { Component, OnInit } from '@angular/core'
import { VehicleService } from '../../services/vehicle.service'
import { VehicleInterface } from '../../interfaces/Vehicle.interface'
import { Router } from '@angular/router'

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.styl']
})
export class VehicleListComponent implements OnInit {
  vehicles: VehicleInterface[] = []
  columns: { property: string, displayName?: string, suffix?: string, type?: 'image' | 'link' }[] = []

  constructor(private route: Router, private vehicleService: VehicleService) { }

  async ngOnInit(): Promise<void> {
    switch (this.route.url) {
      case '/vehicle-list':
        return this.initGlobalArray()
      case '/annual-cost':
        return this.initAnnualCost()
    }
  }

  initGlobalArray(): void {
    this.vehicleService.vehicles.subscribe(vehicles => this.vehicles = vehicles)
    this.columns = [
      { property: 'image', type: 'image' },
      { property: 'marque', displayName: 'Marque' },
      { property: 'modele', displayName: 'Modèle' },
      { property: 'transmission', displayName: 'Transmission' },
      { property: 'portes', displayName: 'Porte' },
      { property: 'puissance', displayName: 'Puissance', suffix: ' CV' },
      { property: 'puissance_fiscale', displayName: 'Puissance Fiscale', suffix: ' CV' },
      { property: 'carburant', displayName: 'Carburant' },
      { property: 'consomation', displayName: 'Consomation', suffix: ' L/100km' },
      { property: 'emission_co2', displayName: 'Emission Co2', suffix: ' g/km' },
      { property: 'prix', displayName: 'Prix', suffix: '€' },
      { property: 'url', displayName: '', type: 'link' }
    ]
  }

  initAnnualCost(): void {
    this.vehicleService.vehicles.subscribe(vehicles => {
      this.vehicles = []
      vehicles.forEach(element => {
        if (
          ['Essence', 'Diesel'].indexOf(element.carburant) === -1 ||
          !element.duree_location ||
          !element.prix ||
          !element.first_loyer ||
          !element.consomation ||
          !element.marque
        ) {
          return
        }
        this.vehicles.push({
          ...element,
          // @ts-ignore
          cost: this.vehicleService.getEstimateCost(element)
        })

      })
    })
    this.columns = [
      { property: 'image', type: 'image' },
      { property: 'modele', displayName: 'Modèle' },
      { property: 'cost', displayName: 'Prix annuel estimé' },
      { property: 'url', displayName: '', type: 'link' }
    ]
  }
}
