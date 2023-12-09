import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../../../shared/services/api.service';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BaseComponent } from 'src/app/base-components/base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent extends BaseComponent implements OnInit, OnChanges {
  exchangeData: any;
  calculatedConversion: any;
  amount: any = 1;
  storeAmount: any;
  exchangeRates: any;
  conversion_result: any = '';
  conversion_rate: any = '1.9';
  base_code: any = 'EUR';
  target_code: any = 'USD';
  conversionResult: any;
  symbols: any;
  fromSelectedCurrency: string = 'EUR';
  toSelectedCurrency: string = 'USD';
  @Output()toCurrencyEmitter:EventEmitter<any>= new EventEmitter()
  @Output()fromCurrencyEmitter:EventEmitter<any>= new EventEmitter()

  @Input() toCurrency: any;
  @Input() fromCurrency: any;
  constructor(private formBuilder: FormBuilder, private apiService:ApiService) {
    super();
    this.getSymbols()
    this.toCurrencyEmitter.emit(this.toSelectedCurrency)

  }
  ngOnChanges(changes: SimpleChanges): void {

    this.conversionForm.get('fromCurrency')?.setValue(  this.fromCurrency)
    this.conversionForm.get('toCurrency')?.setValue(  this.toCurrency)
  }
  conversionForm = new FormGroup({
    amount: new FormControl('1', [Validators.required]),
    fromCurrency: new FormControl('', [Validators.required]),
    toCurrency: new FormControl('', [Validators.required,
    ]),
  });

  ngOnInit(): void {
  }

  getSymbols() {
    this.apiService.getSymbols().pipe(takeUntil(this.ngUnSubscribe)).subscribe(
      (res:any) => {
        // let symbolsJson = Object.keys(res?.symbols);
        debugger
        this.symbols = res?.symbols;

        this.symbols= Object.entries(this.symbols).map(([key, name]) => {
          return { key, name };
        });
        console.log(this.symbols);

        this.convertCurrency()
       },

    );
  }

  convertCurrency() {
    if (this.conversionForm.valid) {
      let storeAmount = this.conversionForm.get('amount')?.value;
      let fromCurrency = this.conversionForm.get('fromCurrency')?.value;
      let toCurrency = this.conversionForm.get('toCurrency')?.value;
      this.toCurrencyEmitter.emit(toCurrency)
      this.fromCurrencyEmitter.emit(fromCurrency)
      this.amount = storeAmount
      this.apiService
        .convertCurrency(fromCurrency, toCurrency, storeAmount)
        .pipe(takeUntil(this.ngUnSubscribe))
        .subscribe({
          next: (res: any) => {
            this.conversion_result = res.conversion_result;
            this.conversion_rate = res.conversion_rate;
            this.base_code = res.base_code;
            this.target_code = res.target_code;
          },
          complete: () =>
            this.apiService.mostPopularConverter(fromCurrency, storeAmount),
        });
    }
  }

  swap(){
    let fromCurrency = this.conversionForm.get('fromCurrency')?.value;
    let toCurrency = this.conversionForm.get('toCurrency')?.value;
    [fromCurrency, toCurrency] = [toCurrency,fromCurrency];
    this.conversionForm.get('fromCurrency')?.setValue(  fromCurrency)
    this.conversionForm.get('toCurrency')?.setValue(  toCurrency)
    if(this.conversionForm.get('amount')?.value){
      this.convertCurrency()
    }
  }
}
