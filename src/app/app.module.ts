import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { ChartsModule } from 'ng2-charts'
import { LegendComponent } from './components/legend/legend.component'
import { HeaderComponent } from './components/header/header.component'
import { NgxFontAwesomeModule } from 'ngx-font-awesome'
import { GraphicComponent } from './components/graphic/graphic.component'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { VehicleListComponent } from './pages/vehicle-list/vehicle-list.component'
import { GraphsComponent } from './pages/graphs/graphs.component'
import { FooterComponent } from './components/footer/footer.component';
import { TableComponent } from './components/table/table.component'

@NgModule({
  declarations: [
    AppComponent,
    LegendComponent,
    HeaderComponent,
    GraphicComponent,
    VehicleListComponent,
    GraphsComponent,
    FooterComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    NgxFontAwesomeModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
