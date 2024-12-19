import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { SideNavComponent} from '../side-nav/side-nav.component';
import { LoginComponent } from '../../pages/login/login.component';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [SideNavComponent, RouterOutlet, LoginComponent],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class LayoutsComponent {
  LoginScreen:boolean = true
  constructor(private router:Router) {}
  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      if (currentRoute === '/login') {
        this.LoginScreen = true;
      } else {
        this.LoginScreen = false
      }
    });
  }
}
