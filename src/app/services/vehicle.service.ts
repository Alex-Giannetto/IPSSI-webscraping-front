import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IDFFuelCost, InsurancesCost, VehicleInterface } from '../interfaces/Vehicle.interface'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  vehicles: BehaviorSubject<VehicleInterface[]> = new BehaviorSubject<VehicleInterface[]>([])

  constructor(private http: HttpClient) { }

  async load(): Promise<void> {
    await this.getAll()
  }

  async getAll(): Promise<VehicleInterface[]> {
    const vehicles = await this.http.get('https://webscraping-ipssi.firebaseio.com/vehicle.json').toPromise() as VehicleInterface[]
    this.vehicles.next(vehicles)
    return vehicles
  }

  getEstimateCost(vehicle: VehicleInterface): string {
    // calculs : (((price * duration) + firstPayment) + ((kilometres moyen par an (15 000) * co2 /100)
    // * (duration/12)) * prix moyen carburant en IDF + (moyen prix assurance par marque * duration)/(duration/12))/(duration/12)

    const carPrice = parseFloat(vehicle.prix) * parseFloat(vehicle.duree_location) + parseFloat(vehicle.first_loyer)
    const consumption = (15000 * (parseFloat(vehicle.consomation) / 100)) * (parseFloat(vehicle.duree_location) / 12) *
      IDFFuelCost[vehicle.carburant]
    const insurances = InsurancesCost[vehicle.marque] * (parseFloat(vehicle.duree_location) / 12)

    return Math.round((carPrice + consumption + insurances) / (parseFloat(vehicle.duree_location) / 12)) + '€'
  }

  sortVehiclesPerBrands(condition: (vehicle) => boolean): { [s: string]: VehicleInterface[] } {
    const brands: { [s: string]: any[] } = {}
    this.vehicles.getValue().map(vehicle => {
      if (condition(vehicle)) {
        return
      }

      if (!brands[vehicle.marque]) {
        brands[vehicle.marque] = []
      }

      brands[vehicle.marque].push(vehicle)
    })

    return brands
  }
}
