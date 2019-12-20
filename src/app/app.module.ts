import { NgModule, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';

import { TimeComponent } from './features/time/time.component';
import { StatisticsComponent } from './features/statistics/statistics.component';
import { TimeRemainingComponent } from './features/time-remaining/time-remaining.component';
import { TimeRemainingCardComponent } from './features/time-remaining/time-remaining-card/time-remaining-card.component';
import { CoffeeCounterComponent } from './features/coffee-counter/coffee-counter.component'
import { WeatherComponent } from './features/weather/weather.component'
import { TimeSpendingComponent } from './features/time-spending/time-spending.component';


import { GlobalService } from './global.service';
import { MaterialModule } from './material.module';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, MaterialModule, HttpClientModule ],
  declarations: [ 
      AppComponent,
      SettingsComponent,
      TimeComponent,
      StatisticsComponent,
      TimeRemainingComponent,
      TimeRemainingCardComponent,
      CoffeeCounterComponent,
      WeatherComponent,
      TimeSpendingComponent
    ],
  bootstrap:    [ AppComponent ],
  providers: [ GlobalService, CookieService ]
})
export class AppModule { }
