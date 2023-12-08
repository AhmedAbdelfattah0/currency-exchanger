import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/base-components/base.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
  constructor( private apiService:ApiService) {
    super()
  }
  popularCurrenciesConverted :any

  ngOnInit() {
    const base_code = environment.base;
     const amount = 1;

      this.apiService.mostPopularConverter(base_code, amount);
      this.apiService.popularCurrenciesConvertedSubject.pipe(takeUntil(this.ngUnSubscribe)).subscribe(res=>{
        this.popularCurrenciesConverted = res;
      })
 }

}
