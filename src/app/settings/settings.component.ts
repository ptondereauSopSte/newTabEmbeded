import { Component } from '@angular/core';

import { GlobalService } from './../global.service';

@Component({
    selector: 'settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent {
    isSettingsMenuOpened : Boolean = false;
    isSubMenuOpened : Boolean = false;
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
        ["https://img3.goodfon.com/wallpaper/nbig/7/88/devushka-bryunetka-model-foto-7149.jpg", "https://i.pinimg.com/originals/bf/16/70/bf16706a144f0de6793b501981c6a1a1.jpg", "https://static1.purepeople.com.br/articles/1/19/78/1/@/182124--950x0-2.jpg","https://jmd.im/wp-content/uploads/2017/06/blackiii_thumbnail.jpg"],
    ]

    constructor(private globalService : GlobalService){}

    openOrCloseMenu(){
        this.isSettingsMenuOpened=!this.isSettingsMenuOpened;
    }
    openOrCloseSubMenu(){
        this.isSubMenuOpened=!this.isSubMenuOpened;
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

    saveBackGround(){
        if (this.mapSelectedBackground['color']){
            this.globalService.saveBackGround('color')
        } else{
            this.globalService.saveBackGround('image')
        }
        
        this.isSettingsMenuOpened = false;
        this.isSubMenuOpened  = false;
    }
}
