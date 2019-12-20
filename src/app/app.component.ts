import { Component, OnInit } from '@angular/core';

import { GlobalService } from './global.service';
import { Subscription } from 'rxjs';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit{
  backgroundColor : string;
  backgroundColorSub : Subscription;
  backgroundImageUrl : string;
  backgroundImageUrlSub : Subscription;
  featuresMap : any;
  featureMapSub : Subscription;

  styleForBackground : SafeStyle;

  searchTxt : string;

  featuresDraggable : Boolean = false;
  featuresDraggableSub : Subscription;

  constructor(private globalService : GlobalService, private sanitizer : DomSanitizer){}

  ngOnInit() {
    this.globalService.init();


    //On récupère les styles pour les background
    this.backgroundColorSub = this.globalService.backgroundColorSubject.subscribe(
      (backgroundColor: string) => {
        this.backgroundColor = backgroundColor.slice();
        this.refreshStyle()
      }
    );
    this.globalService.emitBackgroundColorSubject();

    this.backgroundImageUrlSub = this.globalService.backgroundImageUrlSubject.subscribe(
      (backgroundImageUrl: string) => {
        this.backgroundImageUrl = backgroundImageUrl.slice();
        this.refreshStyle()
      }
    );
    this.globalService.emitBackgroundImageUrlSubject();
    this.refreshStyle()

    //On récupère la map des features
    this.featureMapSub = this.globalService.featuresMapSubject.subscribe(
      (featuresMap: any) => {
        this.featuresMap = featuresMap;
      }
    );
    this.globalService.emitFeaturesMapSubject();

    //On prend le setting de draggabilité (très bizarre ce mot francisé)
    this.featuresDraggableSub = this.globalService.featuresDraggableSubject.subscribe(
      (featuresDraggable: Boolean) => {
        this.featuresDraggable = featuresDraggable;
      }
    );
    this.globalService.emitFeaturesDraggableSubject();
  }

  searchOnGoogle(){
    window.open("http://www.google.com/search?q="+this.searchTxt, "_blank");
  }

  refreshStyle(){
    if(this.backgroundImageUrl){
      this.styleForBackground = this.sanitizer.bypassSecurityTrustStyle("background-image: url("+this.backgroundImageUrl+");");
    } else{
      this.styleForBackground = this.sanitizer.bypassSecurityTrustStyle("background-color: "+this.backgroundColor+";");
    }
  }

  alert(){
    alert("off")
  }

}
