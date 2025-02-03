import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { homepageTeamsResponse } from '../../../core/models/hompage/homepage.model';
import { HomePageService } from '../../../domain/use-cases/homepage/homepge.usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackBarType, StaticImages } from '../../../Shared/shared.classes';
import { LoaderComponent } from '../../components/loader/loader.component';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import { CustomErrorHandler } from '../../../Shared/custom.errormessage';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    MatButtonModule,
    CommonModule,
    LoaderComponent,
    SnackbarComponent,
    MatTooltipModule,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  //Inject Usecase to call the api
  private homePageService = inject(HomePageService);
  private destroyRef = inject(DestroyRef);
  ErrorMessage = '';
  DisplayingMonthAndYear = '';
  IKIGAICompletedTeamCount = 0;
  IKIGAIPendingTeamsCount = 0;
  OneToOneCompletedCount = 0;
  OneToOnePendingCount = 0;
  totalTeamCount=0;
  totalTeamMembersCount=0;
  totalScrumMastersCount=0;

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
    this.homePageService
      .GetHomePageData({
        Page: '', //1
        PageSize: '', //50
        TeamID: '', //1
        Month: '', //1
        Year: '', //2024
        OneToOneStatus: '', //true or false
      })
      .pipe(takeUntilDestroyed(this.destroyRef)) // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          this.loader = false;
          if (response.isValid) {
            //set Team Overview
            this.totalScrumMastersCount = response.teamOverview.totalScrumMastersCount;
            this.totalTeamCount = response.teamOverview.totalTeamCount;
            this.totalTeamMembersCount = response.teamOverview.totalTeamMembersCount;

            // Set Ikigai Overview
            this.DisplayingMonthAndYear = response.dataQueriedMonth + " " + response.dataQueriedYear;
            this.IKIGAICompletedTeamCount =
              response.dashboardHighlights.ikigaiCompletedTeamCount;
            this.IKIGAIPendingTeamsCount =
              response.dashboardHighlights.ikigaiPendingTeamCount;
            this.OneToOneCompletedCount =
              response.dashboardHighlights.oneToOneTotalCompletedCount;
            this.OneToOnePendingCount =
              response.dashboardHighlights.oneToOneTotalPendingCount;

            //Display Team Information
            // Loop through each team and then loop through each team member to assign random avatars
            for (let i = 0; i < response.teams.length; i++) {
              for (
                let j = 0;
                j < response.teams[i].teamMembersList.length;
                j++
              ) {
                const teamMember = response.teams[i].teamMembersList[j];
                response.teams[i].teamMembersList[j].empPicture =
                  this.getRandomImage(teamMember.empGender);
              }
            }
            this.TeamsStatisticData.set(response.teams);

          } else {
            // Handle the failure response here
            this.ErrorMessage = response.remarks;
          }
        },
        error: (error) => {
          this.loader = false;
          this.showSnackBar(
            CustomErrorHandler.handleError(error),
            SnackBarType.Error
          );
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
  };

  CloseSnackBar() {
    this.showSnackbar = false;
  }

  TestNotification() {
    this.homePageService.SendNotification('This is a Real time notification from Button Click event')
      .subscribe({
        next: () => {
          //console.log('SignalR API called successfully');
        },
        error: (err) => {
          console.error('Error sending notification: ', err);
        }
      });
  }
}
