import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'time-remaining',
    templateUrl: 'time-remaining.component.html',
    styleUrls: ['time-remaining.component.scss']
})
export class TimeRemainingComponent implements OnInit {
    isAddingEvent : Boolean = false;
    addDate : Date;
    addTitle : string = "";
    lEvent : any[] = [];

    minDate = new Date(new Date().getTime()+24*60*60*1000);

    constructor(private cookieService : CookieService) {}

    ngOnInit(){
        //On récupère les évents
        let strEvents = this.cookieService.get('tabEmbeded-events')
        if (strEvents){
            this.lEvent = JSON.parse(strEvents)
        } else {
            this.lEvent.push({
                "dateTs" : new Date(new Date().getTime()+24*60*60*1000*2).getTime(),
                "title" : "Demain"
            })
        }
    }

    openAddOrCloseAdd(){
        this.isAddingEvent=!this.isAddingEvent
        this.addTitle = "";
    }

    changeDate(event: MatDatepickerInputEvent<Date>){
        this.addDate = event.value;
    }

    addEvent(){
        let newEvent = {
            "dateTs" : this.addDate.getTime(),
            "title" : this.addTitle
        }
        this.lEvent.push(newEvent)
        this.isAddingEvent=false;
        this.addTitle = "";

        this.refreshCookieEvent();
    }

    deleteEvent(event : any){
        let newEventList = []
        this.lEvent.forEach(function(evenement){
            if (evenement.dateTs !== event.dateTs || evenement.title !== event.title){
                newEventList.push(evenement)
            }
        })
        this.lEvent = newEventList.slice()
        this.refreshCookieEvent();
    }

    refreshCookieEvent(){
        let strEvent = "["
        this.lEvent.forEach(function(event){
            strEvent+="{\"dateTs\":"+event.dateTs+",\"title\":\""+event.title+"\"},"
        })
        strEvent=strEvent.slice(0, strEvent.length-1)+"]"
        this.cookieService.set('tabEmbeded-events', strEvent ,365)
    }
}
