import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: "menstruel",
  templateUrl: "./menstruel.component.html",
  styleUrls: ["./menstruel.component.scss"]
})

export class MenstruelComponent implements OnInit {
  circleDay = []
  currentDay = 22
  multi: number;
  scaleStyle: SafeStyle;
  constructor(private cookieService: CookieService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    for (var k = 0; k < 28; k++) {
      let newDay = {}
      newDay["day"] = k + 1
      newDay["isPeriod"] = k < 5 ? true : false;
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
}
