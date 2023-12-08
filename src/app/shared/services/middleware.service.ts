import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {
  convertCurrency:{url:string,headers:[]}
  getSymbols:{url:string,headers:[]}
  constructor() {
    this.buildUrls()
   }

 private buildUrls() {
    this.convertCurrency ={url:'convert',headers:[] }
    this.getSymbols ={url:'symbols',headers:[] }
  }
}
