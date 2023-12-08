import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: ''
})
export class BaseComponent implements OnDestroy {
  ngUnSubscribe = new Subject<void>();

  constructor() { }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
