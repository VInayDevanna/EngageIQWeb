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
  constructor(private authService: MsalService) {}
  private navigationService = inject(NavigationService);
  private destroyRef = inject(DestroyRef);
  LoggedInUserName = '';
  LoggedInUserRole = '';
  LastLogin = '';
  GenderImagePath = '';
  UserEmpID = '';
  ngOnInit(): void {
    //get last login from local storage
    (this.LastLogin = localStorage.getItem('LastLogin') ?? ''),
      //call Navigation Menu Service
      this.navigationService
        .GetNavigationMenusBasedOnUser()
        .pipe(takeUntilDestroyed(this.destroyRef)) // Automatically unsubscribe on destroy
        .subscribe({
          next: (response) => {
            if (response.isValid) {
              this.LoggedInUserName = response.userName;
              this.LoggedInUserRole = response.roleName;
              this.UserEmpID = response.userID;
              console.log('UserName', this.LoggedInUserName);
            } else {
            }
          },
          error: (error) => {
            console.log('Error', error);
          },
        });
  }
}
