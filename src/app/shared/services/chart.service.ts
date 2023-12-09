import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MiddlewareService } from './middleware.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  requests: any[] = [];
  conventionHistory: any[] = [];
  conventionHistorySubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );

  constructor(
    private middlewareService: MiddlewareService,
    private http: HttpClient
  ) {}

  getConventionHistory(
    fromCurrency: string,
    toCurrency: string,
    year: string,
    month: string,
    day: any
  ) {
    return this.http.get(
      `${environment.apiUrl}/${year}-${month}-${day}?access_key=${environment.apiKey}&base=${fromCurrency}&symbols=${toCurrency}`
    );
  }

  /**
   * Retrieves the historical data for the last year between two currencies.
   *
   * @param fromCurrency - The base currency.
   * @param toCurrency - The target currency.
   * @returns - An Observable that emits the historical data.
   */
  getHistoryForLastYear(fromCurrency: string, toCurrency: string) {
    let year: any, month: any, day: any;
    year = new Date().getFullYear() - 1;
    month = new Date().getMonth();
    day = new Date(year, month, 0).getDate();
    /**
     * Generates an array of numbers representing the months of the year.
     *
     * @returns An array of numbers from 1 to 12.
     */
    let yearMontes: any = Array.from({ length: 12 }, (_, index) => index + 1);

    this.requests = yearMontes.map((_:any, index: any) =>
      this.getConventionHistory(
        fromCurrency,
        toCurrency,
        year,
        index + 1 < 10 ? `0${index + 1}` : index + 1,
        index + 1==2?28:day
      )
    );

    return forkJoin(this.requests).subscribe({
      next: (res) => {
         this.conventionHistory = res;
      },
      complete: () => {
        this.conventionHistorySubject.next(this.conventionHistory);
      },
    });
  }
}
