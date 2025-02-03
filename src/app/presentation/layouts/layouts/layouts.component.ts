import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { LoginComponent } from '../../pages/login/login.component';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [
    SideNavComponent,
    RouterOutlet,
    LoginComponent,
    HeaderComponent,
    CommonModule,
  ],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
})
export class LayoutsComponent {
  LoginScreen: boolean = true;
  scroll: boolean = false;
  constructor(private router: Router) { }
  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      if (currentRoute === '/login') {
        this.LoginScreen = true;
      } else {
        this.LoginScreen = false;
      }
    });
    window.addEventListener('scroll', this.onWindowScroll, true);
  }

  onWindowScroll(): void {
    if (
      document.documentElement.getElementsByClassName('content')[0].scrollTop >
      0
    ) {
      this.scroll = true;
      document
        .getElementsByClassName('content__header')[0]
        .classList.add('scroll');
    } else {
      this.scroll = false;
      document
        .getElementsByClassName('content__header')[0]
        .classList.remove('scroll');
    }
  }
}
