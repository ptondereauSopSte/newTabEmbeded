import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalService {
    backgroundColor: string = "#131E29";
    backgroundColorSubject = new Subject<string>();

    constructor() { }

    setBackGroundColor(colorStr : string){
        this.backgroundColor=colorStr;
        this.emitBackgroundColorSubject();
    }

    emitBackgroundColorSubject(){
        this.backgroundColorSubject.next(this.backgroundColor.slice());
    }

}