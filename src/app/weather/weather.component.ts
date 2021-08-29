import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApixuService} from '../apixu.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public blankOptions!: FormGroup;
  public weatherSearchForm!: FormGroup;
  public location!: String;
  public weatherDataUS: any;
  public weatherData: any;
  public theResponse!: String;
  public additionalOptions!: FormGroup;
  public factorConditions!: boolean;
  public minTemperature!: number;
  public isCentigrade!: boolean;
  public sampleUS: any = {
    "request": {
      "type": "IP",
      "query": "184.97.132.127",
      "language": "en",
      "unit": "f"
    },
    "location": {
      "name": "Millard Mobile Home Park",
      "country": "United States of America",
      "region": "Nebraska",
      "lat": "41.211",
      "lon": "-96.130",
      "timezone_id": "America/Chicago",
      "localtime": "2021-08-28 22:10",
      "localtime_epoch": 1630188600,
      "utc_offset": "-5.0"
    },
    "current": {
      "observation_time": "03:10 AM",
      "temperature": 84,
      "weather_code": 113,
      "weather_icons": [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png"
      ],
      "weather_descriptions": [
        "Clear"
      ],
      "wind_speed": 11,
      "wind_degree": 150,
      "wind_dir": "SSE",
      "pressure": 1013,
      "precip": 0,
      "humidity": 64,
      "cloudcover": 0,
      "feelslike": 81,
      "uv_index": 9,
      "visibility": 10,
      "is_day": "no"
    },
    "forecast": {
      "2021-08-27": {
        "date": "2021-08-27",
        "date_epoch": 1630022400,
        "astro": {
          "sunrise": "06:47 AM",
          "sunset": "08:05 PM",
          "moonrise": "10:51 PM",
          "moonset": "11:59 AM",
          "moon_phase": "Last Quarter",
          "moon_illumination": 62
        },
        "mintemp": 77,
        "maxtemp": 104,
        "avgtemp": 88,
        "totalsnow": 0,
        "sunhour": 13.5,
        "uv_index": 8
      }
    }
  };
  public sample: any = {
    "request": {
      "type": "IP",
      "query": "184.97.132.127",
      "language": "en",
      "unit": "m"
    },
    "location": {
      "name": "Millard Mobile Home Park",
      "country": "United States of America",
      "region": "Nebraska",
      "lat": "41.211",
      "lon": "-96.130",
      "timezone_id": "America/Chicago",
      "localtime": "2021-08-28 22:11",
      "localtime_epoch": 1630188660,
      "utc_offset": "-5.0"
    },
    "current": {
      "observation_time": "03:11 AM",
      "temperature": 29,
      "weather_code": 113,
      "weather_icons": [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png"
      ],
      "weather_descriptions": [
        "Clear"
      ],
      "wind_speed": 17,
      "wind_degree": 150,
      "wind_dir": "SSE",
      "pressure": 1013,
      "precip": 0,
      "humidity": 64,
      "cloudcover": 0,
      "feelslike": 27,
      "uv_index": 9,
      "visibility": 16,
      "is_day": "no"
    },
    "forecast": {
      "2021-08-27": {
        "date": "2021-08-27",
        "date_epoch": 1630022400,
        "astro": {
          "sunrise": "06:47 AM",
          "sunset": "08:05 PM",
          "moonrise": "10:51 PM",
          "moonset": "11:59 AM",
          "moon_phase": "Last Quarter",
          "moon_illumination": 62
        },
        "mintemp": 25,
        "maxtemp": 40,
        "avgtemp": 31,
        "totalsnow": 0,
        "sunhour": 13.5,
        "uv_index": 8
      }
    }
  };
  constructor(private formBuilder: FormBuilder, private apixuService: ApixuService) { }
  ngOnInit() {
    this.blankOptions = this.formBuilder.group({});
    this.weatherSearchForm = this.formBuilder.group({location: ['']});
    this.additionalOptions = this.formBuilder.group({factorConditions: [''], minTemperature: [''], isCentigrade: ['']});
    this.sendToAPIXUService();
    // this.sendToAPIXU();
  }

  applyStyles() {
    var color;
    color = this.theResponse === 'No!' ? {'color' : 'red'} : {'color' : 'green'};
    return color;
  }

  sendToAPIXU(formValues: WeatherComponent) {
  this.apixuService.getWeather(formValues.location)[1].subscribe(data => {this.weatherDataUS = data; });
    this.apixuService.getWeather(formValues.location)[0].subscribe(data => { this.weatherData = data; });
    this.determineConditionsBlank();
  }

  sendToAPIXUService() {
    this.apixuService.getWeather('')[1].subscribe(data => { this.weatherDataUS = data; console.log(this.weatherDataUS); });
    this.apixuService.getWeather('')[0].subscribe(data => { this.weatherData = data; console.log(this.weatherData); });

    //TESTING ONLY
    //this.weatherDataUS = this.sampleUS;
    //this.weatherData = this.sample;
    console.log(this.weatherDataUS);
    console.log(this.weatherData);
    
  }

 determineConditionsBlank() {    
   for (let i in this.weatherDataUS?.forecast) {
     this.theResponse = this.weatherDataUS?.forecast[i].avgtemp == undefined ? "" : this.weatherDataUS?.forecast[i].avgtemp > 60 ? "Yes!" : "No!";
     break;
   }
    // console.log(this.theResponse);
  }

  determineConditionsFilled(params: any) {
    var factConds = params.factorConditions == undefined || params.factorConditions === "" ? false : params.factorConditions;
    var minTemp: number = params.minTemperature == undefined || +params.minTemperature + "" === "NaN" || params.minTemperature === "" ? 60 : +params.minTemperature;
    var centigrade = params.isCentigrade == undefined || params.isCentigrade === "" ? false : params.isCentigrade;
    // console.log(factConds + " " + minTemp + " " + centigrade);
    // console.log(params);
    if(minTemp == undefined) {
      minTemp = 60;
      if(centigrade) {
        minTemp = (60-32) * 5.0 / 9.0;
      }
    }
    if(centigrade) {
      minTemp = minTemp * 9.0 / 5.0 + 32;
    }
    // console.log(minTemp);
    for (let i in this.weatherDataUS?.forecast) {
      this.theResponse = this.weatherDataUS?.forecast[i].avgtemp == undefined ? "" : this.weatherDataUS?.forecast[i].avgtemp > minTemp ? "Yes!" : "No!";
      break;
    }
    if(factConds) {
      var areBadConditions: boolean = false;
      for(var i = 0; i < this.weatherDataUS?.current.weather_descriptions.length; i++) {
        var element: String = this.weatherDataUS?.current.weather_descriptions[i].toLowerCase();
        areBadConditions = areBadConditions || element.includes("rain") || element.includes("drizzle") || element.includes("freez") /*Intentionally spelled that way*/ || element.includes("snow") || element.includes("blizzard") || element.includes("thunder") || element.includes("mist") || element.includes("sleet");
      }
      this.theResponse = areBadConditions && this.weatherDataUS?.forecast[i].mintemp <= minTemp ? "No!" : this.theResponse;  
    }
    // console.log(this.theResponse);
    params.minTemperature = undefined;
    params.factorConditions = undefined;
    params.isCentigrade = undefined;
  }

}
