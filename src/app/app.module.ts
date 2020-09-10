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

@NgModule({
  declarations: [
    AppComponent,
    LegendComponent,
    HeaderComponent,
    GraphicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    NgxFontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
