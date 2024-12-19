import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavMenu, NavTeamIndividualResponse } from '../../../core/models/navigation/navigation.model';
import { MsalService } from '@azure/msal-angular';
import { NavigationService } from '../../../domain/use-cases/navigation/navigation.usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatListModule, RouterModule, CommonModule, MatExpansionModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit {

  //Inject Usecase to call the api
  constructor(private authService: MsalService,
  ) { }
  private navigationService = inject(NavigationService);
  private destroyRef = inject(DestroyRef);
  ErrorMessage = '';
  LoggedInUserName = '';
  LoggedInUserRole = '';
  GenderImagePath = '';
  UserEmpID='';
  // Initializing the Signal with an initial menu list 
  sideNavMenus = signal<NavMenu[]>([]);
  sidenavTeamsLinks = signal<NavTeamIndividualResponse[]>([]);//signal<NavTeamResponse = {} as NavTeamResponse;



  ngOnInit(): void {
    //call Navigation Menu Service  
    this.navigationService.GetNavigationMenusBasedOnUser()
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          if (response.isValid) {
            // Set the signal with the fetched navigation data
            this.LoggedInUserName = response.userName;
            this.LoggedInUserRole = response.roleName;
            this.UserEmpID = response.userID;
            //save UserEMpID in local storage
            localStorage.setItem('LoggedInEmployeeID', this.UserEmpID);
            if (response.gender.toUpperCase() === 'MALE')
              this.GenderImagePath = "assets/Avatars/M/Default.jpeg";
            else
              this.GenderImagePath = "assets/Avatars/F/Default.jpeg";
            this.sideNavMenus.set(response.menuList);
          }
          else {
            // Handle the failure response here
            this.ErrorMessage = response.remarks
          }
        },
        error: (error) => {
          // Handle any errors here
          if (error.status === 401) {
            this.ErrorMessage = "Unauthorized access - 401";
            // Handle 401 Unauthorized error
          } else if (error.status === 404) {
            this.ErrorMessage = "Resource not found - 404";
            // Handle 404 Not Found error
          } else if (error.status === 400) {
            this.ErrorMessage = "Bad request - 400";
            // Handle 400 Bad Request error
          } else {
            this.ErrorMessage = "An unexpected error occurred: " + error;
            // Handle other types of errors
          }
        },
      });
    //hide  loading
    //this.isloading = false;  


    // //call Teams Menu Service  
    // this.navigationService.GetTeamsAndChildMenusBasedOnUser()
    //   .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
    //   .subscribe({
    //     next: (response) => {

    //       if (response.isValid) {
    //         // Set the signal with the fetched team data
    //         this.sidenavTeamsLinks.set(response.teams);
    //       }
    //       else {
    //         // Handle the failure response here
    //         this.ErrorMessage = response.remarks
    //       }
    //     },
    //     error: (error) => {
    //       // Handle any errors here
    //       if (error.status === 401) {
    //         this.ErrorMessage = "Unauthorized access - 401";
    //         // Handle 401 Unauthorized error
    //       } else if (error.status === 404) {
    //         this.ErrorMessage = "Resource not found - 404";
    //         // Handle 404 Not Found error
    //       } else if (error.status === 400) {
    //         this.ErrorMessage = "Bad request - 400";
    //         // Handle 400 Bad Request error
    //       } else {
    //         this.ErrorMessage = "An unexpected error occurred: " + error;
    //         // Handle other types of errors
    //       }
    //     },
    //   });

  }

  logoutFunction = () => {
    this.authService.logoutRedirect();
  }
}