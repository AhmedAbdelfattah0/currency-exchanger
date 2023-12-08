import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {
  convertCurrency:{url:string,headers:[]}
  getSymbols:{url:string,headers:[]}
  mostPopularConverter:{url:string,headers:[]}
  constructor() {
    this.buildUrls()
   }

 private buildUrls() {
    this.convertCurrency ={url:'pair',headers:[] }
    this.getSymbols ={url:'symbols',headers:[] }
    this.mostPopularConverter ={url:'pair',headers:[] }
  }
}
