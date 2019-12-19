import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'time-remaining-card',
    templateUrl: 'time-remaining-card.component.html',
    styleUrls: ['time-remaining-card.component.scss']
})
export class TimeRemainingCardComponent implements OnInit {
    @Input() event : any;
    nbrJour : number = 0;
    title : String;

    ngOnInit(){
        console.log(this.event.dateTs)
        this.nbrJour = Math.floor((this.event.dateTs -new Date().getTime())/(24*60*60*1000))
        this.title = this.event.title
    }
}
