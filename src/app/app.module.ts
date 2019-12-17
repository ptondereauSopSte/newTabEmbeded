import { NgModule, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';

import { TimeComponent } from './features/time/time.component';
import { StatisticsComponent } from './features/statistics/statistics.component';

import { GlobalService } from './global.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, SettingsComponent, TimeComponent, StatisticsComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ GlobalService, CookieService ]
})
export class AppModule { }
