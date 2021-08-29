import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {
  // public key1: String = "9858e5b2efde46adfc0e87e29bebaf54";
  public key: String = "657a5b1bd51fa896451f7a4d38a02371";
  constructor(private http: HttpClient) { }

  getWeather(location: String) {
    location = location.length == 0 ? 'fetch:ip' : location;
    var myGetUS = this.http.get('https://api.weatherstack.com/forecast?access_key=' + this.key + '&query='+location + '&units=f');
    var myGet = this.http.get('https://api.weatherstack.com/forecast?access_key=' + this.key + '&query=' + location);
    return [myGet, myGetUS];
  }
}
