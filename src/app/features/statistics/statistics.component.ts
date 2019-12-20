import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Component({
    selector: 'statistics',
    templateUrl: 'statistics.component.html',
    styleUrls: ['statistics.component.scss']
})
export class StatisticsComponent {
    @Input() fake : Boolean;
    nbrTab:number;
    percentToPrint:string;
    colorPercentTab:string

    constructor(private cookieService : CookieService) {}

    ngOnInit(){
        let currentDate=new Date();
        let dateStrFormat = currentDate.getUTCDate()+"/"+(currentDate.getMonth()+1)+"/"+currentDate.getUTCFullYear();
        if(this.cookieService.get('tabEmbeded-currentDate')!==dateStrFormat){
            //Init des tab pour la journée si on est sur une journée différente

            //On met à jour la moyenne
            let nTab = Number(this.cookieService.get('tabEmbeded-nDayTab'));
            let mean = Number(this.cookieService.get('tabEmbeded-meanTab'));
            mean=mean*nTab+Number(this.cookieService.get('tabEmbeded-numberTabToday'));
            nTab+=1;
            mean=mean/nTab
            this.cookieService.set('tabEmbeded-meanTab', ""+mean, 365)
            this.cookieService.set('tabEmbeded-nDayTab', ""+nTab, 365)

            if(!this.fake){
              this.cookieService.set('tabEmbeded-numberTabToday', "1", 365)
            }
            this.nbrTab=1
            if(!this.fake){
              this.cookieService.set('tabEmbeded-currentDate', dateStrFormat, 365)
            }

        } else{
            this.nbrTab=Number(this.cookieService.get('tabEmbeded-numberTabToday'))
            if(!this.fake){
              this.nbrTab+=1
              this.cookieService.set('tabEmbeded-numberTabToday', ""+this.nbrTab, 365)
            }
            
        }

        this.setPercent()
    }

    setPercent(){
        let percentTab=Math.floor(100*(this.nbrTab/Number(this.cookieService.get('tabEmbeded-meanTab')))-100)
        this.colorPercentTab = this.defineColor(percentTab)
        this.percentToPrint = percentTab < 0 ? ""+percentTab : "+"+percentTab;
    }

    defineColor(percentage : number){
        percentage = Math.min(100, (percentage+100)/200);
        let percentColors = [
          { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
          { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
          { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];
        
        for (var i = 1; i < percentColors.length - 1; i++) {
          if (percentage < percentColors[i].pct) {
              break;
          }
        }
        var lower = percentColors[i - 1];
        var upper = percentColors[i];
        var range = upper.pct - lower.pct;
        var rangePct = (+percentage - lower.pct) / range;
        var pctLower = 1 - rangePct;
        var pctUpper = rangePct;
        var color = {
          r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
          g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
          b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
        };
        return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
      }
}