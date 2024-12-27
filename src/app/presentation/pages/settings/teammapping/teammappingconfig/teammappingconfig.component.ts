import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { SnackbarComponent } from '../../../../components/snackbar/snackbar.component';
import { ELMappingMasterDataResponse, MappingMasterData, TeamMappingData, TeamMappingRequest } from '../../../../../core/models/settings/teammapping.model';
import { TeamMappingService } from '../../../../../domain/use-cases/settings/teammapping.usecase';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackBarType } from '../../../../../Shared/shared.classes';

@Component({
  selector: 'app-teammappingconfig',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    SnackbarComponent,
    MatAutocompleteModule,
    MatChipsModule,
  ],
  templateUrl: './teammappingconfig.component.html',
  styleUrl: './teammappingconfig.component.scss'
})

export class TeammappingconfigComponent implements OnInit {

  constructor(@Inject(LiveAnnouncer) private _liveAnnouncer: LiveAnnouncer) { }

  //Inject Service
  private _teamMappingService = inject(TeamMappingService);
  private destroyRef = inject(DestroyRef);

  loader: boolean = false;
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;
  DataDisplayingMonth = '';


  //Table Data
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  TeamMappingData: TeamMappingData[] = [];
  SMList: MappingMasterData[] = {} as MappingMasterData[];
  CDLList: MappingMasterData[] = {} as MappingMasterData[];
  dataSource = new MatTableDataSource<TeamMappingData>(this.TeamMappingData);
  @ViewChild('inputs') input!: ElementRef<HTMLInputElement>;
  displayedColumns: string[] = ['teamName', 'smEmployeeID', 'cdlEmployeeID'];
  filteredOptions: MappingMasterData[] = {} as MappingMasterData[];

  //For saving
  originalDataFromServer: ELMappingMasterDataResponse = {} as ELMappingMasterDataResponse;

  ngOnInit(): void {
    this.getTeamMappingMasterData();
  }

  getTeamMappingMasterData() {
    // Call the service to get the master data
    this.loader = true;
    this._teamMappingService.GetTeamMappingMasterData()
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          this.loader = false;
          if (response?.isValid) {
            this.DataDisplayingMonth=response.dataQueriedMonthName;
            this.originalDataFromServer = response;
            this.TeamMappingData = response.teamMappingData;
            this.CDLList = response.cdlList;
            this.SMList = response.smList;
            this.TeamMappingData = this.TeamMappingData.map((data) => ({
              ...data,
              filteredOptions: [...this.SMList],
            }));
            this.showTableData();
          }
          else {
            //Clear the Action Items Tab Data
            this.TeamMappingData = [];
            this.showTableData();
            // Handle the failure response here
            this.handleError(response.remarks);
          }
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  private handleError(error: any): void {
    this.loader = false;
    switch (error?.status) {
      case 401:
        this.showSnackBar("Unauthorized access - 401.", SnackBarType.Error);
        break;
      case 404:
        this.showSnackBar("Resource not found - 404.", SnackBarType.Error);
        break;
        case 400:
          if (error?.error?.errors) {
            // Extract validation error messages from error.error.errors
            const validationMessages = Object.entries(error.error.errors)
              .map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
              .join("\n");
    
            this.showSnackBar(validationMessages, SnackBarType.Error);
          } else if (error?.error?.title) {
            this.showSnackBar(error.error.title, SnackBarType.Error);
          } else {
            this.showSnackBar("Bad request - 400.", SnackBarType.Error);
          }
          break;
      default:
        this.showSnackBar("An unexpected error occurred: " + (error?.message || "Unknown error"), SnackBarType.Error);

    }
  }

  showSnackBar = (message: string, msgType: string) => {
    this.showSnackbar = true;
    this.snackbarMessge = message;
    this.snackbarType = msgType;
  }

  CloseSnackBar = () => {
    this.showSnackbar = false;
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /* Remove Chips from CDL Fields */
  removeCDLOptions(chip: string, team: string): void {
    this.TeamMappingData.forEach((element) => {
      if (element.teamID === team) {
        element.cdlEmployeeID = element.cdlEmployeeID.filter(
          (cdl) => cdl !== chip
        );
      }
    });
  }

  /* Autocomplete for SM Fields */
  filter(query: any, element: any): void {
    element.filteredOptions = this.SMList.filter((sm) =>
      sm.name.toLowerCase().includes(query.target.value.toLowerCase())
    );
    if (query.target.value === '' && element.smEmployeeID !== '') {
      element.smEmployeeID = '';
    }
  }

  getSMEmployeeName(smEmployeeID: string): string {
    if (smEmployeeID !== '') {
      return (
        this.SMList.find((SMDetails) => SMDetails.id === smEmployeeID)?.name ||
        ''
      );
    }
    return '';
  }

  onOptionSelected(event: any, element: any): void {
    const selectedName = event.option.value;
    const matchedSM = this.SMList.find((sm) => sm.name === selectedName);
    element.smEmployeeID = matchedSM ? matchedSM.id : '';
  }

  showTableData() {
    this.dataSource = new MatTableDataSource<TeamMappingData>(this.TeamMappingData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cancel() {

    this.showSnackBar('You changes has been reset', SnackBarType.Success);
    this.TeamMappingData = this.originalDataFromServer.teamMappingData;
    this.TeamMappingData = this.TeamMappingData.map((data) => ({
      ...data,
      filteredOptions: [...this.SMList],
    }));
    this.showTableData();
  }

  save() {
    this.loader = true;

    const originalData = this.originalDataFromServer.teamMappingData;
    const modifiedData = this.dataSource.data.map((data) => ({
      teamID: data.teamID,
      teamName: data.teamName,
      smEmployeeID: data.smEmployeeID,
      cdlEmployeeID: data.cdlEmployeeID,
      scrumMasterEmployeeID: data.smEmployeeID,
      commaSeparetedCdlEmployeeID: data.cdlEmployeeID.join(","),
    }));

    // Filter for changed data
    const changedData = modifiedData.filter((data, index) => {
      const original = originalData[index];
      return (
        data.teamID !== original.teamID ||
        data.teamName !== original.teamName ||
        data.smEmployeeID !== original.smEmployeeID ||
        data.cdlEmployeeID.join(",") !== original.cdlEmployeeID.join(",") // Compare as comma-separated strings
      );
    });

    if (changedData.length > 0) {
      // Create API request object
      const apiRequest: TeamMappingRequest = {
        loggedInUserEmpID: localStorage.getItem('LoggedInEmployeeID') || '',
        teamMappingList: changedData,
      };

      this._teamMappingService.SaveTeamMapping(apiRequest)
        .pipe(takeUntilDestroyed(this.destroyRef)) // Automatically unsubscribe on destroy
        .subscribe({
          next: (response) => {
            this.loader = false;
            if (response?.isValid) {
              this.showSnackBar(response.remarks, SnackBarType.Success);
            } else {
              this.showSnackBar(response.remarks, SnackBarType.Error);
            }
          },
          error: (error) => {
            this.loader = false;
            this.handleError(error);
          },
        });
    }
    else {
      this.loader = false;
      this.showSnackBar('No Changes Made', SnackBarType.Error);
    }
  }

}
