import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Component({
    selector: 'statistics',
    templateUrl: 'statistics.component.html',
    styleUrls: ['statistics.component.scss']
})
export class StatisticsComponent {
    nbrTab:number;

    constructor(private cookieService : CookieService) {}

    ngOnInit(){
        let currentDate=new Date();
        let dateStrFormat = currentDate.getUTCDate()+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getUTCFullYear();
        if(this.cookieService.get('tabEmbeded-currentDate')!==dateStrFormat){
            //Init des tab pour la journée si on est sur une journée différente
            this.cookieService.set('tabEmbeded-numberTabToday', "1")
            this.nbrTab=1
            this.cookieService.set('tabEmbeded-currentDate', dateStrFormat)
        } else{
            this.nbrTab=Number(this.cookieService.get('tabEmbeded-numberTabToday'))
            this.nbrTab+=1
            this.cookieService.set('tabEmbeded-numberTabToday', ""+this.nbrTab)
        }
        /*this.cookieService.set('tabEmbeded-numberTabToday', ""+0)
        this.cookieValue = this.cookieService.get('my-cookiez')
        console.log(this.cookieValue)*/
    }
}