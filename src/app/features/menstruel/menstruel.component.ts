import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: "menstruel",
  templateUrl: "./menstruel.component.html",
  styleUrls: ["./menstruel.component.scss"]
})

export class MenstruelComponent implements OnInit {
  settingsOpen: boolean = true;
  minDate = new Date();

  circleDay = []
  currentDay = 22
  multi: number;
  scaleStyle: SafeStyle;

  datePeriods: Date;
  durationPeriods: Number;

  constructor(private cookieService: CookieService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (this.durationPeriods) {
      this.initCircle()
    }
  }

  initCircle() {
    for (var k = 0; k < 28; k++) {
      let newDay = {}
      newDay["day"] = k + 1
      newDay["isPeriod"] = k < Number(this.durationPeriods) ? true : false;
      newDay["isFertil"] = k > 11 && k < 17 ? true : false;
      newDay["style"] = this.sanitizer.bypassSecurityTrustStyle("" +
        // Rotate
        "transform : rotate(" + (k * 360) / 28 + "deg);" +
        // Left
        "left : " + Math.cos(((k * 360) / 28 + 90) * Math.PI / 180) * (-7) + 'vw;' +
        // Top
        "top : " + Math.sin(((k * 360) / 28 + 90) * Math.PI / 180) * (-7) + 'vw;'
      );
      this.circleDay.push(newDay)
    }
  }

  openOrCloseSettings() {
    this.settingsOpen = !this.settingsOpen;
  }

  changeDate(event: MatDatepickerInputEvent<Date>) {
    this.datePeriods = event.value;
  }

  save() {
    this.settingsOpen = false;
    let congruenceTs28dl = Math.floor(this.datePeriods.getTime() / (24 * 60 * 60 * 1000)) % 28
    let congruenceTs28now = Math.floor((new Date().getTime()) / (24 * 60 * 60 * 1000)) % 28
    if (congruenceTs28dl >= congruenceTs28now) {
      this.currentDay = 28 - (congruenceTs28dl - congruenceTs28now)
    } else {
      this.currentDay = 28 - (28 + congruenceTs28dl - congruenceTs28now)
    }

    console.log(this.currentDay)
    this.initCircle()
  }
}
