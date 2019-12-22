import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GlobalService {
    backgroundColor: string;
    backgroundColorSubject = new Subject<string>();
    backgroundImageUrl: string;
    backgroundImageUrlSubject = new Subject<string>();
    featuresMap: any;
    featuresMapSubject = new Subject<any>();

    featuresDraggable = false;
    featuresDraggableSubject = new Subject<Boolean>();

    constructor(private cookieService: CookieService) { }

    init() {
        this.backgroundColor = this.cookieService.get('tabEmbeded-backgroundColor') ? this.cookieService.get('tabEmbeded-backgroundColor') : "#131E29"
        this.backgroundImageUrl = this.cookieService.get('tabEmbeded-backgroundImageUrl');

        //Pour check les mises à jour de feature pour les utilisateurs
        let shouldBeRefreshed = false;
        let currentFeatures = ['time', 'statistics', 'timeCounter', 'counters', 'weather', 'panda', 'periods']
        if (!this.cookieService.get('tabEmbeded-currentFeatures') ||
            this.cookieService.get('tabEmbeded-currentFeatures') !== "" + currentFeatures) {
            this.cookieService.set('tabEmbeded-currentFeatures', "" + currentFeatures, 365);
            shouldBeRefreshed = true
        }
        if (this.cookieService.get('tabEmbeded-featuresMap') && !shouldBeRefreshed) {
            this.featuresMap = JSON.parse(this.cookieService.get('tabEmbeded-featuresMap'));
        } else {
            this.featuresMap = {
                "time":
                {
                    "name": "Time",
                    "enabled": true,
                },
                "statistics":
                {
                    "name": "Statistics",
                    "enabled": true,
                },
                "timeCounter":
                {
                    "name": "Time counter",
                    "enabled": true
                },
                "counters":
                {
                    "name": "Counters",
                    "enabled": true
                },
                "weather":
                {
                    "name": "Weather",
                    "enabled": true
                },
                "panda":
                {
                    "name": "Panda counter",
                    "enabled": true
                },
                "periods":
                {
                    "name": "Periods indicator",
                    "enabled": true
                }
            }
            this.saveFeatures(this.featuresMap)
        }
    }

    setBackGround(keyAdd: string, arg: string) {
        if (keyAdd === 'color') {
            this.backgroundColor = arg;
            this.backgroundImageUrl = ""
            this.emitBackgroundColorSubject();
            this.emitBackgroundImageUrlSubject();
        } else if (keyAdd === 'image') {
            this.backgroundImageUrl = arg;
            this.emitBackgroundImageUrlSubject();
        }
    }
    setFeature(keyFeature: string, checked: Boolean) {
        this.featuresMap[keyFeature].enabled = checked;
        this.emitFeaturesMapSubject();
    }

    saveBackGround(keyAdd: string) {
        if (keyAdd === 'color') {
            this.cookieService.set('tabEmbeded-backgroundColor', this.backgroundColor, 365)
            this.cookieService.set('tabEmbeded-backgroundImageUrl', "", 365)
        } else if (keyAdd === 'image') {
            this.cookieService.set('tabEmbeded-backgroundImageUrl', this.backgroundImageUrl, 365)
        }
    }

    saveFeatures(featuresMap: any) {
        this.featuresDraggable = false;
        this.cookieService.set('tabEmbeded-featuresMap', JSON.stringify(featuresMap), 365)
        this.emitFeaturesDraggableSubject();
    }

    editPositionInFeatureMap(keyFeature: string, positionStyle: string) {
        this.featuresMap[keyFeature]['position'] = positionStyle;
        this.emitFeaturesMapSubject();
    }

    enableOrDisableMove() {
        this.featuresDraggable = !this.featuresDraggable;
        this.emitFeaturesDraggableSubject();
    }

    emitBackgroundColorSubject() {
        this.backgroundColorSubject.next(this.backgroundColor.slice());

    }

    emitBackgroundImageUrlSubject() {
        this.backgroundImageUrlSubject.next(this.backgroundImageUrl.slice());
    }

    emitFeaturesMapSubject() {
        this.featuresMapSubject.next(this.featuresMap);
    }

    emitFeaturesDraggableSubject() {
        this.featuresDraggableSubject.next(this.featuresDraggable);
    }
}