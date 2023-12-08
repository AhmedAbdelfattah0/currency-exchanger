import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isScrolling = false;
  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolling = window.scrollY > 0;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
