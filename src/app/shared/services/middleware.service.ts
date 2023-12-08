import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {
  convertCurrency:{url:string,headers:[]}
  constructor() {
    this.buildUrls()
   }

  buildUrls() {
    this.convertCurrency ={url:'convert',headers:[] }
  }
}
