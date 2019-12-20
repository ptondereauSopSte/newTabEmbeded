import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "time-spending",
  templateUrl: "./time-spending.component.html",
  styleUrls: ["./time-spending.component.scss"]
})

export class TimeSpendingComponent implements OnInit {
  counterDays:number;

  constructor(private cookieService : CookieService) {}

  ngOnInit() {
    this.counterDays = 14
    if (!this.cookieService.get('tabEmbeded-timePanda')){
      this.cookieService.set('tabEmbeded-timePanda', ''+new Date().getTime(), 365)
      this.counterDays=0
    } else {
      this.counterDays = Math.floor((new Date().getTime() - Number(this.cookieService.get('tabEmbeded-timePanda')))/(24*60*60*1000));
    }
  }

  resetCard(){
    this.counterDays=0;
    this.cookieService.set('tabEmbeded-timePanda', ''+new Date().getTime(), 365);
  }
}
