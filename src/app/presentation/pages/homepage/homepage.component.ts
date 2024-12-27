import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HomePageResponse, homepageTeamsResponse } from '../../../core/models/hompage/homepage.model';
import { HomePageService } from '../../../domain/use-cases/homepage/homepge.usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackBarType, StaticImages } from '../../../Shared/shared.classes';
import { LoaderComponent } from "../../components/loader/loader.component";
import { SnackbarComponent } from "../../components/snackbar/snackbar.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [MatButtonModule, CommonModule, LoaderComponent, SnackbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  //Inject Usecase to call the api
  private homePageService = inject(HomePageService);
  private destroyRef = inject(DestroyRef);
  ErrorMessage = '';
  DataDisplayingMonth = '';
  IKIGAICompletedTeamCount = 0;
  IKIGAIPendingTeamsCount = 0;
  OneToOneCompletedCount = 0;
  OneToOnePendingCount = 0;

  // Initializing the Signal with an initial menu list 
  TeamsStatisticData = signal<homepageTeamsResponse[]>([]);
  //Snackbar
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;
  loader: boolean = false;

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
            this.IKIGAICompletedTeamCount = response.dashboardHighlights.ikigaiCompletedTeamCount;
            this.IKIGAIPendingTeamsCount = response.dashboardHighlights.ikigaiPendingTeamCount;
            this.OneToOneCompletedCount = response.dashboardHighlights.oneToOneTotalCompletedCount;
            this.OneToOnePendingCount = response.dashboardHighlights.oneToOneTotalPendingCount;

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
            this.ErrorMessage = response.remarks
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
    //hide  loading
    //this.isloading = false;  
  }

  getRandomImage(gender: string): string {
    return StaticImages.getRandomImage(gender);
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
