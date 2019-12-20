import { Component, OnInit } from '@angular/core';

import { GlobalService } from './../global.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit{
    isSettingsMenuOpened : Boolean = false;
    isSubMenuOpened: any = {
        "background":false,
        "features":false,
    }

    mapSelectedBackground: any = {
        "color":true,
        "image":false,
        "random":false,
    }
    listsChoiceColorForBackground : any =[
        ["#48D597", "#131E29", "#FCFEFB", "#2E2E31"],
        ["#EE5340", "#FDD086", "#F6EB61", "#47A23F"],
        ["#71DBD4", "#71C5E8", "#D7B9E4", "#545859"]
    ]

    listsChoiceImageForBackground : any =[
        ["https://images.unsplash.com/photo-1506202687253-52e1b29d3527?ixlib=rb-1.2.1&w=1000&q=80", "https://c4.wallpaperflare.com/wallpaper/4/562/548/dark-pattern-texture-wallpaper-thumb.jpg", "https://wallpaperplay.com/walls/full/b/6/5/14787.jpg", "https://cdn.wonderfulengineering.com/wp-content/uploads/2016/03/Water-wallpaper-12.jpg"],
        ["https://img3.goodfon.com/wallpaper/nbig/7/88/devushka-bryunetka-model-foto-7149.jpg", "https://i.pinimg.com/originals/bf/16/70/bf16706a144f0de6793b501981c6a1a1.jpg", "https://images.unsplash.com/photo-1483794344563-d27a8d18014e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80","https://jmd.im/wp-content/uploads/2017/06/blackiii_thumbnail.jpg"],
        ["https://www.elsetge.cat/myimg/f/46-465549_cute-unicorn-wallpaper-engine.gif", "https://www.a2tech.eu/wp-content/uploads/2019/11/pikaaaaa-chuuuuuuuu.gif", "https://media1.tenor.com/images/8d8356c866266cef31ed2f2e119ffe58/tenor.gif?itemid=5552832", "https://thumbs.gfycat.com/DecimalThisDiscus-small.gif"]
    ]

    featuresMap : any;
    featureMapSub : Subscription;
    
    featuresMapKeys:string[] = []

    constructor(private globalService : GlobalService){}

    ngOnInit(){
        this.featureMapSub = this.globalService.featuresMapSubject.subscribe(
            (featuresMap: string) => {
                this.featuresMap = featuresMap;
            }
        );
        this.globalService.emitFeaturesMapSubject();
        this.featuresMapKeys = Object.keys(this.featuresMap)
    }
    openOrCloseMenu(){
        this.isSettingsMenuOpened=!this.isSettingsMenuOpened;
    }
    openOrCloseSubMenu(key : string){
        var alreadyOpened = this.isSubMenuOpened[key];
        this.isSubMenuOpened = {
            "background":false,
            "features":false,
        }
        if (!alreadyOpened){
            this.isSubMenuOpened[key]=true
        }
    }

    selectOnMap(key : string, value : string){
        if (key==="background"){
            this.mapSelectedBackground = {
                "color":false,
                "image":false,
                "random":false,
            }
            this.mapSelectedBackground[value]=true
        }
    }

    setBackground(key: string, arg: string){
        this.globalService.setBackGround(key, arg)
    }

    save(key:string){
        if (key==='background'){
            if (this.mapSelectedBackground['color']){
                this.globalService.saveBackGround('color')
            } else{
                this.globalService.saveBackGround('image')
            }
        }

        if (key==='features'){
            this.globalService.saveFeatures(this.featuresMap);
        }
        
        this.isSettingsMenuOpened = false;
        this.isSubMenuOpened  = false;
    }

    editEnabledFeatures(event:any, keyFeature : string){
        this.featuresMap[keyFeature].enabled = event.checked
        this.globalService.setFeature(keyFeature, event.checked)
    }

    enableMove(){
        this.globalService.enableOrDisableMove();
    }
}
