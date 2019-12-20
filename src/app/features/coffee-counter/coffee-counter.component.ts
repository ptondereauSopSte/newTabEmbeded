import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'coffee-counter',
    templateUrl: 'coffee-counter.component.html',
    styleUrls: ['coffee-counter.component.scss']
})
export class CoffeeCounterComponent implements OnInit{
    counterCoffee : number;
    counterBreak : number;

    constructor(private cookieService : CookieService) {}

    ngOnInit(){
        let currentDate=new Date();
        let dateStrFormat = currentDate.getUTCDate()+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getUTCFullYear();
        if(this.cookieService.get('tabEmbeded-currentDate')!==dateStrFormat){
            this.cookieService.set('tabEmbeded-currentDate', dateStrFormat, 365)
            this.cookieService.set('tabEmbeded-coffeeCounter', '0', 365);
            this.counterCoffee = 0
            this.cookieService.set('tabEmbeded-breakCounter', '0', 365);
            this.counterBreak = 0
        } else{
            this.counterCoffee = Number(this.cookieService.get('tabEmbeded-coffeeCounter'));
            this.counterBreak = Number(this.cookieService.get('tabEmbeded-breakCounter'));
        }
    }

    addCoffee(){
        this.counterCoffee = Number(this.cookieService.get('tabEmbeded-coffeeCounter'));
        this.counterCoffee+=1;
        this.cookieService.set('tabEmbeded-coffeeCounter', ''+this.counterCoffee, 365);
    }

    addBreak(){
        this.counterBreak = Number(this.cookieService.get('tabEmbeded-breakCounter'));
        this.counterBreak+=1;
        this.cookieService.set('tabEmbeded-breakCounter', ''+this.counterBreak, 365);
    }
}
