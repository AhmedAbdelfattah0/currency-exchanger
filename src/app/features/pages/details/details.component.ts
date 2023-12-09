import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
 toCurrency:any
 fromCurrency:any
  constructor() { }

  ngOnInit(): void {
  }

}
