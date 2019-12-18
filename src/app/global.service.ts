import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalService {
    backgroundColor: string;
    backgroundColorSubject = new Subject<string>();
    backgroundImageUrl: string;
    backgroundImageUrlSubject = new Subject<string>();

    constructor(private cookieService : CookieService) { }

    init(){
        this.backgroundColor = this.cookieService.get('tabEmbeded-backgroundColor') ? this.cookieService.get('tabEmbeded-backgroundColor') : "#131E29"
        this.backgroundImageUrl = this.cookieService.get('tabEmbeded-backgroundImageUrl');
    }

    setBackGround(keyAdd: string, arg : string){
        if (keyAdd==='color'){
            this.backgroundColor=arg;
            this.backgroundImageUrl=""
            this.emitBackgroundColorSubject();
            this.emitBackgroundImageUrlSubject();
        } else if (keyAdd==='image'){
            this.backgroundImageUrl=arg;
            this.emitBackgroundImageUrlSubject();
        }
    }

    saveBackGround(keyAdd: string){
        if (keyAdd==='color'){
            this.cookieService.set('tabEmbeded-backgroundColor', this.backgroundColor, 365)
            this.cookieService.set('tabEmbeded-backgroundImageUrl', "", 365)
        } else if (keyAdd==='image'){
            this.cookieService.set('tabEmbeded-backgroundImageUrl', this.backgroundImageUrl, 365)
        }
    }

    emitBackgroundColorSubject(){
        this.backgroundColorSubject.next(this.backgroundColor.slice());
        
    }

    emitBackgroundImageUrlSubject(){
        this.backgroundImageUrlSubject.next(this.backgroundImageUrl.slice());
    }

}