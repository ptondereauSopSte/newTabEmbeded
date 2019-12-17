import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'time',
    templateUrl: 'time.component.html',
    styleUrls: ['time.component.scss']
})
export class TimeComponent implements OnInit{
    hour : string;

    ngOnInit(){
        this.setHour();
        setInterval(()=>{
            this.setHour();
        },1000)
    }

    setHour(){
        let hour = new Date().getHours() < 10 ? "0"+(new Date().getHours()) : ""+(new Date().getHours())
        let min = new Date().getMinutes() < 10 ? "0"+(new Date().getMinutes()) : ""+(new Date().getMinutes())
        this.hour = hour+":"+min;
    }

}
