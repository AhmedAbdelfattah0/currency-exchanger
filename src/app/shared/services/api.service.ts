import { Injectable } from '@angular/core';
import { MiddlewareService } from './middleware.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  popularCurrencies: string[] = [
    'USD',
    'EUR',
    'JPY',
    'GBP',
    'AUD',
    'CAD',
    'CHF',
    'CNY',
    'EGP',
  ];
  popularCurrenciesConverted: any[] = [];
  requests: any[] = [];
  popularCurrenciesConvertedSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
   constructor(
    private middlewareService: MiddlewareService,
    private http: HttpClient
  ) {}

  convertCurrency(fromCurrency: string, toCurrency: string, amount: number) {
    return this.http.get(
      `${environment.apiConvertUrl}/${environment.apiKeyForConvert}/${this.middlewareService.convertCurrency.url}/${fromCurrency}/${toCurrency}/${amount}`
    );
  }
  convertCurrencyForMostPopular(
    fromCurrency: string,
    toCurrency: string,
    amount: number
  ) {
    return this.http.get(
      `${environment.apiConvertUrl}/${environment.apiKeyForConvert}/${this.middlewareService.mostPopularConverter.url}/${fromCurrency}/${toCurrency}/${amount}`
    );
  }

  getSymbols() {
    return this.http.get(
      `${environment.apiUrl}/${this.middlewareService.getSymbols.url}?access_key=${environment.apiKey}`
    );
  }
/**
 * Summary:
 * The code defines a method called "mostPopularConverter" which takes a base code and an amount as input.
 * It performs currency conversion for the most popular currencies using the "convertCurrencyForMostPopular" method.
 * The results are stored in the "popularCurrenciesConverted" array and emitted through the "popularCurrenciesConvertedSubject".
 * The method returns an Observable that can be subscribed to.
 */
  mostPopularConverter(base_code: any, amount: any) {
    this.requests = this.popularCurrencies.map((currency) =>
      this.convertCurrencyForMostPopular(base_code, currency, amount)
    );

    return forkJoin(this.requests).subscribe({
      next: (res: any) => {
        if (res && res.length) {
          this.popularCurrenciesConverted = res.map((results: any) => {
            return {
              conversion_result: results?.conversion_result,
              conversion_rate: results?.conversion_rate,
              base_code: results?.base_code,
              target_code: results?.target_code,
            };
          });
        }
        return this.popularCurrenciesConverted;
      },
      complete: () =>
        this.popularCurrenciesConvertedSubject.next(
          this.popularCurrenciesConverted
        ),
    });
  }
}
