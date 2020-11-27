import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component'
import { GraphsComponent } from './pages/graphs/graphs.component'

const routes: Routes = [
  {
    path: 'vehicle-list',
    component: VehicleListComponent
  },
  {
    path: 'power-cost-ratio',
    component: GraphsComponent
  },
  {
    path: 'price-brand',
    component: GraphsComponent
  },
  {
    path: 'co2-fuel-ratio',
    component: GraphsComponent
  },
  {
    path: 'annual-cost',
    component: VehicleListComponent
  },
  {
    path: '**',
    redirectTo: 'vehicle-list'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
