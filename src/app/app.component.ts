import { Component, OnInit } from '@angular/core';

import { GlobalService } from './global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit{
  backgroundColor : string;
  backgroundColorSub : Subscription;

  searchTxt : string;

  constructor(private globalService : GlobalService){}

  ngOnInit() {
    this.backgroundColorSub = this.globalService.backgroundColorSubject.subscribe(
      (backgroundColor: string) => {
        this.backgroundColor = backgroundColor.slice();
      }
    );
    this.globalService.emitBackgroundColorSubject();
  }

  searchOnGoogle(){
    window.open("http://www.google.com/search?q="+this.searchTxt, "_blank");
  }

}
