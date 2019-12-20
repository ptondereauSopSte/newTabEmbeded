import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'weather',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.scss']
})
export class WeatherComponent implements OnInit{
    weatherForecast={
        'today' : {},
        'tomorrow' : {},
        'tomorrowOfTomorrow': {}
    }
    constructor(private httpClient: HttpClient) {}
    
    ngOnInit(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                let lat = pos.coords.latitude;
                let long = pos.coords.longitude;
                this.httpClient.get<any>("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+long+"&units=metric&appid=c8c1f8336008e847de3b4833b0f26210").subscribe(
                    (response) => {
                        //Températures
                        this.weatherForecast['today']["temperature"] = response.list[0].main.temp
                        this.weatherForecast['tomorrow']["temperature"] = response.list[8].main.temp
                        this.weatherForecast['tomorrowOfTomorrow']["temperature"] = response.list[16].main.temp

                        //Méteo
                        this.weatherForecast['today']["image"]="http://openweathermap.org/img/wn/"+response.list[0].weather[0].icon+"@2x.png";
                        this.weatherForecast['tomorrow']["image"]="http://openweathermap.org/img/wn/"+response.list[8].weather[0].icon+"@2x.png";
                        this.weatherForecast['tomorrowOfTomorrow']["image"]="http://openweathermap.org/img/wn/"+response.list[16].weather[0].icon+"@2x.png";

                    },
                    (error) => {
                        console.log('Erreur ! : ' + error); 
                    }
                );

            });
        }
    }
}
