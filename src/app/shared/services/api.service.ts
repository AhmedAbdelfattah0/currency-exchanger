import { Injectable } from '@angular/core';
import { MiddlewareService } from './middleware.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private middlewareService:MiddlewareService,private http:HttpClient) { }

  convertCurrency(fromCurrency:string,toCurrency:string){
    return this.http.get(`${environment.apiUrl}/${this.middlewareService.convertCurrency.url}?access_key=${environment.apiKey}&${fromCurrency}&${toCurrency}`)
  }
}
