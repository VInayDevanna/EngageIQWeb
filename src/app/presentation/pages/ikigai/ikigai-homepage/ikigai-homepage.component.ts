import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HomePageService } from '../../../../domain/use-cases/homepage/homepge.usecase';
import { homepageTeamsResponse } from '../../../../core/models/hompage/homepage.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackBarType, StaticImages } from '../../../../Shared/shared.classes';
import { Router } from '@angular/router';
import { LoaderComponent } from "../../../components/loader/loader.component";
import { SnackbarComponent } from "../../../components/snackbar/snackbar.component";

@Component({
  selector: 'app-ikigai-homepage',
  standalone: true,
  imports: [LoaderComponent, SnackbarComponent],
  templateUrl: './ikigai-homepage.component.html',
  styleUrl: './ikigai-homepage.component.scss'
})
export class IkigaiHomepageComponent implements OnInit {

  //Inject Usecase to call the api
  private router = inject(Router);
  private homePageService = inject(HomePageService);
  private destroyRef = inject(DestroyRef);
  DataDisplayingMonth = '';
  loader: boolean = false;
  // Initializing the Signal with an initial menu list 
  TeamsStatisticData = signal<homepageTeamsResponse[]>([]);
  //Snackbar
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;

  ngOnInit(): void {

    this.loader = true;
    //call Homepage Service  
    this.homePageService.GetHomePageData({
      Page: '',//1
      PageSize: '',//50
      TeamID: '',//1
      Month: '',//1
      Year: '',//2024
      OneToOneStatus: '',//true or false
    })
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          this.loader = false;
          if (response.isValid) {
            // Set the signal with the fetched navigation data
            this.DataDisplayingMonth = response.dataQueriedMonth;
            // Loop through each team and then loop through each team member to assign random avatars
            for (let i = 0; i < response.teams.length; i++) {
              for (let j = 0; j < response.teams[i].teamMembersList.length; j++) {
                const teamMember = response.teams[i].teamMembersList[j];
                response.teams[i].teamMembersList[j].empPicture = this.getRandomImage(teamMember.empGender);
              }
            }
            this.TeamsStatisticData.set(response.teams);
          }
          else {
            // Handle the failure response here
            this.showSnackBar(response.remarks, SnackBarType.Error);
          }
        },
        error: (error) => {
          this.loader = false;
          // Handle any errors here
          if (error.status === 401) {
            this.showSnackBar("Unauthorized access - 401", SnackBarType.Error);
            // Handle 401 Unauthorized error
          } else if (error.status === 404) {
            this.showSnackBar("Resource not found - 404", SnackBarType.Error);
            // Handle 404 Not Found error
          } else if (error.status === 400) {            
            // Handle 400 Bad Request error
            if (error?.error?.errors) {
              // Extract validation error messages from error.error.errors
              const validationMessages = Object.entries(error.error.errors)
                .map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
                .join("\n");

              this.showSnackBar(validationMessages, SnackBarType.Error);
            }
            else if (error?.error?.title) {
              this.showSnackBar(error.error.title, SnackBarType.Error);
            }
            else {
              this.showSnackBar("Bad request - 400.", SnackBarType.Error);
            }

          } else {
            this.showSnackBar("An unexpected error occurred: " + error, SnackBarType.Error);
            // Handle other types of errors
          }
        },
      });
  }

  getRandomImage(gender: string): string {
    return StaticImages.getRandomImage(gender);
  }

  redirectToIkigaiPage(teamId: string, teamName: string) {
    // Redirect to the ikigai page with the teamId
    this.router.navigate(['/IKIGAI', teamId, teamName]);
  }

  showSnackBar = (message: string, msgType: string) => {
    this.showSnackbar = true;
    this.snackbarMessge = message;
    this.snackbarType = msgType;
  }

  CloseSnackBar() {
    this.showSnackbar = false;
  }

}
