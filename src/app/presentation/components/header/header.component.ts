import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { NavigationService } from '../../../domain/use-cases/navigation/navigation.usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  loggedInUserName = '';
  lastLoginTime = '';
  LoggedInUserRole = '';
  GenderImagePath = '';
  ngOnInit(): void {
    //get last login from local storage
    this.lastLoginTime = localStorage.getItem('LastLogin') ?? '';
    this.loggedInUserName = localStorage.getItem('LoggedInUsername') ?? '';
    this.LoggedInUserRole = localStorage.getItem('LoggedInUserRole') ?? '';
    if (localStorage.getItem('Gender')?.toString() === 'MALE')
      this.GenderImagePath = 'assets/Avatars/M/Default.jpeg';
    else this.GenderImagePath = 'assets/Avatars/F/Default.jpeg';
  }
}
