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
        ["https://wallpaperplay.com/walls/full/0/3/1/326919.jpg", "http://miam-images.m.i.pic.centerblog.net/o/642c05b1.jpg", "https://jmd.im/wp-content/uploads/2017/06/blackiii_thumbnail.jpg", "https://desktopwalls.net/wp-content/uploads/2015/08/Damasc%20Pattern%20Green%20Desktop%20Wallpaper.jpg"],
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
        
    }
}
