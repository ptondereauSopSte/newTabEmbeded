import { NgModule, ChangeDetectorRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';

import { TimeComponent } from './features/time/time.component';

import { GlobalService } from './global.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, SettingsComponent, TimeComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ GlobalService ]
})
export class AppModule { }
