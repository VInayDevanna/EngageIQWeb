import { CommonModule } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject, Inject, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { SnackBarType } from '../../../../Shared/shared.classes';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TeamMappingRequest } from '../../../../core/models/settings/teammapping.model';
import { PageData, RoleConfigData, RoleConfigResponse } from '../../../../core/models/settings/roleconfig.models';
import { RoleConfigService } from '../../../../domain/use-cases/settings/roleconfig.usecase';
import { CustomErrorHandler } from '../../../../Shared/custom.errormessage';

@Component({
  selector: 'app-roleconfig',
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
  templateUrl: './roleconfig.component.html',
  styleUrl: './roleconfig.component.scss'
})
export class RoleconfigComponent {

  constructor(@Inject(LiveAnnouncer) private _liveAnnouncer: LiveAnnouncer) { }

  //Inject Service
  private _roleConfigService = inject(RoleConfigService);
  private destroyRef = inject(DestroyRef);

  loader: boolean = false;
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;


  //Table Data
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  RoleConfigData: RoleConfigData[] = [];
  dataSource = new MatTableDataSource<RoleConfigData>(this.RoleConfigData);
  @ViewChild('inputs') input!: ElementRef<HTMLInputElement>;
  displayedColumns: string[] = ['pageName', 'pageID'];
  filteredOptions: PageData[] = {} as PageData[];

  //For saving
  originalDataFromServer: RoleConfigResponse = {} as RoleConfigResponse;

  ngOnInit(): void {
    this.getRoleData();
  }

  getRoleData() {
    // Call the service to get the master data
    this.loader = true;
    this._roleConfigService.GetRolesData()
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          this.loader = false;
          if (response?.isValid) {           
            this.originalDataFromServer = response;
            // this.RoleConfigData = response.teamMappingData;            
            // this.RoleConfigData = this.RoleConfigData.map((data) => ({
            //   ...data,
            //   filteredOptions: [...this.SMList],
            // }));
            this.showTableData();
          }
          else {
            //Clear the Action Items Tab Data
            this.RoleConfigData = [];
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
    this.showSnackBar(CustomErrorHandler.handleError(error), SnackBarType.Error);        
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

  showTableData() {
    this.dataSource = new MatTableDataSource<RoleConfigData>(this.RoleConfigData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  cancel() {

    this.showSnackBar('You changes has been reset', SnackBarType.Success);
    // this.RoleConfigData = this.originalDataFromServer.teamMappingData;
    // this.RoleConfigData = this.RoleConfigData.map((data) => ({
    //   ...data,
    //   filteredOptions: [...this.SMList],
    // }));
    this.showTableData();
  }

  save() {
    // this.loader = true;

    // const originalData = this.originalDataFromServer.teamMappingData;
    // const modifiedData = this.dataSource.data.map((data) => ({
    //   teamID: data.teamID,
    //   teamName: data.teamName,
    //   smEmployeeID: data.smEmployeeID,
    //   cdlEmployeeID: data.cdlEmployeeID,
    //   scrumMasterEmployeeID: data.smEmployeeID,
    //   commaSeparetedCdlEmployeeID: data.cdlEmployeeID.join(","),
    // }));

    // Filter for changed data
  //   const changedData = modifiedData.filter((data, index) => {
  //     const original = originalData[index];
  //     return (
  //       data.teamID !== original.teamID ||
  //       data.teamName !== original.teamName ||
  //       data.smEmployeeID !== original.smEmployeeID ||
  //       data.cdlEmployeeID.join(",") !== original.cdlEmployeeID.join(",") // Compare as comma-separated strings
  //     );
  //   });

  //   if (changedData.length > 0) {
  //     // Create API request object
  //     const apiRequest: TeamMappingRequest = {
  //       loggedInUserEmpID: localStorage.getItem('LoggedInEmployeeID') || '',
  //       teamMappingList: changedData,
  //     };

  //     this._roleConfigService.SaveTeamMapping(apiRequest)
  //       .pipe(takeUntilDestroyed(this.destroyRef)) // Automatically unsubscribe on destroy
  //       .subscribe({
  //         next: (response) => {
  //           this.loader = false;
  //           if (response?.isValid) {
  //             this.showSnackBar(response.remarks, SnackBarType.Success);
  //           } else {
  //             this.showSnackBar(response.remarks, SnackBarType.Error);
  //           }
  //         },
  //         error: (error) => {
  //           this.loader = false;
  //           this.handleError(error);
  //         },
  //       });
  //   }
  //   else {
  //     this.loader = false;
  //     this.showSnackBar('No Changes Made', SnackBarType.Error);
  //   }
  }
}
