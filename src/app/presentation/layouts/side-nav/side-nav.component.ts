import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { NavMenu } from '../../../core/models/navigation/navigation.model';
import { MsalService } from '@azure/msal-angular';
import { NavigationService } from '../../../domain/use-cases/navigation/navigation.usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackBarType } from '../../../Shared/shared.classes';
import { CustomErrorHandler } from '../../../Shared/custom.errormessage';

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
  UserEmpID='';
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;
  // Initializing the Signal with an initial menu list 
  sideNavMenus = signal<NavMenu[]>([]);
  showDocumentationMenu=true;

  ngOnInit(): void {   
    //call Navigation Menu Service  
    this.navigationService.GetNavigationMenusBasedOnUser()
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          if (response.isValid) {
            this.UserEmpID=response.userID
            // store last login,rolename, userid and username in local storage
            localStorage.setItem('LoggedInUsername',response.userName),
            localStorage.setItem('LoggedInUserRole',response.roleName),
            localStorage.setItem('LoggedInEmployeeID', this.UserEmpID);
            localStorage.setItem('Gender', response.gender.toUpperCase());
            this.sideNavMenus.set(response.menuList);
          }
          else {
            // Handle the failure response here
            this.showSnackBar(response.remarks, SnackBarType.Error);
          }
        },
        error: (error) => {
          // Handle any errors here
           this.showSnackBar(CustomErrorHandler.handleError(error), SnackBarType.Error);       
        },
      });
  }

  showSnackBar = (message: string, msgType: string) => {
    this.showSnackbar = true;
    this.snackbarMessge = message;
    this.snackbarType = msgType;
  }

  logoutFunction = () => {
    this.authService.logoutRedirect();
  }
}