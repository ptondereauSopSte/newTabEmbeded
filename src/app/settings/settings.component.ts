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

    setBackgroundColor(colorStr: string){
        this.globalService.setBackGroundColor(colorStr)
    }
}
