import { Component, ViewChild, inject, Inject, OnInit, DestroyRef, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { NgxEditorModule, Validators, Editor, Toolbar } from 'ngx-editor';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { Action, ActionItems, Category, IkigaiRequest, SaveActionItemRequest, teamMembers } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';
import { IkigaiService } from '../../../../domain/use-cases/ikigai-individual/ikigaiIndividual-data.use-case';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackBarType, StaticImages } from '../../../../Shared/shared.classes';
import { PanelList } from '../../../../Shared/shared.classes';
import { EmptyHTMLValidator } from '../../../../Shared/custom.validator';
import { SnackbarComponent } from "../../../components/snackbar/snackbar.component";
import { CustomErrorHandler } from '../../../../Shared/custom.errormessage';
@Component({
  selector: 'app-ikigai-teams',
  standalone: true,
  imports: [MatIconModule, CommonModule, LoaderComponent, MatTabsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatSelectModule, NgxEditorModule, FormsModule,
    ReactiveFormsModule, SnackbarComponent],
  templateUrl: './ikigai-teams.component.html',
  styleUrl: './ikigai-teams.component.scss'
})


export class IkigaiTeamsComponent implements OnInit {

  private _ikigaiService = inject(IkigaiService);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  constructor(@Inject(LiveAnnouncer) private _liveAnnouncer: LiveAnnouncer) { }

  teamID: string = '';
  teamName = '';
  ErrorMessage = '';
  DataDisplayingMonth = '';
  DataQueriedMonth = '0';
  DataQueriedYear = '0';
  goingGoodDisabled: boolean = false;
  KeyImprovementsDisabled: boolean = false;
  improvementFeedbacksDisabled: boolean = false;
  selectedEmpID = '';
  selectedEmpName = '';
  loader: boolean = false;
  isKigigaiDataAvailable = false;
  showIkigaiConfigScreen = false;
  noOfDaysLeftToCompleteIkigaiForCurrentMonth = 5;
  // Expose the enum to your template
  PanelList = PanelList;

  goingGoodeditor!: Editor;
  goingGoodform!: FormGroup;
  keyImprovementsEditor!: Editor;
  keyImprovementsForm!: FormGroup;

  // Initializing the Signal with an initial team members list 
  teamMembers = signal<teamMembers[]>([]);
  IkigaiID = '';//To Save/update Ikigai Data

  //For Action Items Tab
  ActionItems: ActionItems[] = [];
  dataSource = new MatTableDataSource<ActionItems>(this.ActionItems);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ["feedback", "category", "addedOn", "status"];
  feedbackCategories: Category[] = [];
  feedbackStatus: Action[] = [];
  selectedFeedbackCategory: string = '';
  selectedFeedbackStatus: string = '';


  //Snackbar
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;

  //For Editor
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['bullet_list'],//'ordered_list', 
    //[{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
    // ['link', 'image'],
    // ['code', 'blockquote'],
  ];

  ngOnInit(): void {
    // Initialize the editor
    this.goingGoodeditor = new Editor();
    this.keyImprovementsEditor = new Editor();

    // Initialize the form
    this.goingGoodform = this.fb.group({
      content: ['', [Validators.required, EmptyHTMLValidator()]], // FormControl for the editor content
    });
    this.keyImprovementsForm = this.fb.group({
      content: ['', [Validators.required, EmptyHTMLValidator()]], // FormControl for the editor content
    });

    //Get master data for dropdowns
    this.getMasterData();

    //First get the team members based on the teamID and then call the service to get the ikigai data of the first employee in the list
    this.getTemMembersAndBindFirstEmployeeDetails(true,'','');
  }

  getMasterData() {
    // Call the service to get the master data
    this.loader = true;
    this._ikigaiService.GetMasterData()
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          this.loader = false;
          if (response?.isValid) {
            // Bind the feedback categories
            this.feedbackCategories = response.category;
            // Bind the feedback action
            this.feedbackStatus = response.actions;
          }
          else {
            // Handle the failure response here            
            this.handleError(response.remarks);
          }
        },
        error: (error) => {         
          this.handleError(error);
        },
      });
  }

  getTemMembersAndBindFirstEmployeeDetails(CallingOnPageload: boolean = false, empID: string = '', empName: string = '') {
    this.loader = true;
    //call the service to get all team members based on teamID
    this.teamID = this.route.snapshot.paramMap.get('id')!;
    this.teamName = this.route.snapshot.paramMap.get('teamname')!;
    this._ikigaiService.GetTeamMembersByTeamID({
      TeamID: this.teamID,//1
      Month: '',//1
      Year: '',//2024   
    })
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          this.loader = false;
          if (response?.isValid) {
            if (response.teamMembers?.length > 0) {
              this.DataDisplayingMonth = response.dataQueriedMonthName;
              this.DataQueriedMonth = response.dataQueriedMonth;
              this.DataQueriedYear = response.dataQueriedYear.toString();
              // Loop through each team member to assign random avatars
              for (let i = 0; i < response.teamMembers.length; i++) {
                const gender = response.teamMembers[i].gender;
                response.teamMembers[i].empPicture = this.getRandomImage(gender);
              }
              // Set the signal with the fetched navigation data
              this.teamMembers.set(response.teamMembers);
              //get Ikigai Data of first employee in the list
              if (CallingOnPageload)
              this.getEmployeeIkigaiData(response.teamMembers[0].empID, response.teamMembers[0].empName);
            else
              this.getEmployeeIkigaiData(empID, empName);
            }
            else
              this.handleError('No Data Found');
          }
          else {
            // Handle the failure response here
            this.handleError(response.remarks);
          }
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  getEmployeeIkigaiData(empID: string, empName: string) {
    this.loader = true;
    this.IkigaiID = '';//reset IKIGAI ID
    this.isKigigaiDataAvailable = false;//defualt to false
    this.selectedEmpID = empID;
    this.selectedEmpName = empName;
    this._ikigaiService.GetIkigaiActionItemsByUserID({ empID: empID, Month: this.DataQueriedMonth, Year: this.DataQueriedYear })
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          this.loader = false;
          if (response?.isValid) {
            this.goingGoodform.get('content')?.setValue(response.goingGoodsHTML);
            this.keyImprovementsForm.get('content')?.setValue(response.keyImprovementsHTML);
            this.goingGoodDisabled = true;
            this.IkigaiID = response.ikigaiID;
            this.KeyImprovementsDisabled = true;
            this.isKigigaiDataAvailable = true;
            // Bind Action Items Tab Data
            this.ActionItems = response.actionItems;
            this.dataSource = new MatTableDataSource<ActionItems>(this.ActionItems);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else {
            this.goingGoodform.controls['content'].setValue('');
            this.keyImprovementsForm.controls['content'].setValue('');
            this.goingGoodDisabled = false;
            this.KeyImprovementsDisabled = false;
            //Clear the Action Items Tab Data
            this.ActionItems = [];
            this.dataSource = new MatTableDataSource<ActionItems>(this.ActionItems);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

  toggleEditIcon(panelName: string) {
    if (panelName === PanelList.GoingGood)
      this.goingGoodDisabled = !this.goingGoodDisabled;
    else if (panelName === PanelList.KeyImprovements)
      this.KeyImprovementsDisabled = !this.KeyImprovementsDisabled;
    else if (panelName === PanelList.ImprovementsFeedback)
      this.improvementFeedbacksDisabled = !this.improvementFeedbacksDisabled;
    else if (panelName === PanelList.CancelFeedBack) {
      this.goingGoodDisabled = true;
      this.KeyImprovementsDisabled = true;
    }
    else if (panelName === PanelList.CancelActionItem) {
      this.improvementFeedbacksDisabled = true;
    }
  }

  ngOnDestroy(): void {
    if (this.goingGoodeditor) {
      this.goingGoodeditor.destroy();
    }
    if (this.keyImprovementsEditor) {
      this.keyImprovementsEditor.destroy();
    }
  }
  private markAllAsTouched(): void {
    // Use type assertion to tell TypeScript that controls are of type FormControl
    // Object.keys(this.empform.controls).forEach(key => {
    //   (this.empform.controls[key as keyof typeof this.empform.controls] as FormControl).markAsTouched();
    // });

    //or 

    Object.values(this.keyImprovementsForm.controls).forEach(control => control.markAsTouched());
    Object.values(this.goingGoodform.controls).forEach(control => control.markAsTouched());
  }

  SaveIkigaiData() {
    //this.markAllAsTouched();
    if (!this.goingGoodform.invalid && !this.keyImprovementsForm.invalid) {
      this.loader = true;
      const GoingGoodHTML = this.goingGoodform.value.content;
      const KeyIMprovementHTML = this.keyImprovementsForm.value.content;

      //Create API request object
      const apiRequest: IkigaiRequest = {
        IKIGAIID: this.IkigaiID,
        LoggedInUserEmpID: localStorage.getItem('LoggedInEmployeeID') ?? '',
        TeamID: parseInt(this.teamID),
        EmployeeID: this.selectedEmpID,
        Month: parseInt(this.DataQueriedMonth),
        Year: parseInt(this.DataQueriedYear),
        KeyImprovementsList: [],
        GoingGoodHTML: GoingGoodHTML,
        KeyImprovementsHTML: KeyIMprovementHTML
      };
      // Parse KeyIMprovementHTML into a DOM structure
      const doc = new DOMParser().parseFromString(KeyIMprovementHTML, 'text/html');
      const arrayFromElements: string[] = [];

      // Extract text content from relevant elements
      Array.from(doc.body.children).forEach((child: Element) => {
        if (child.tagName === "UL" || child.tagName === "OL") {
          // If the element is a list, get all list items
          const listItems = child.querySelectorAll('li');
          listItems.forEach((li) => {
            arrayFromElements.push(li.textContent?.trim() || ""); // Add trimmed text content
          });
        } else {
          // For other elements, add their text content
          arrayFromElements.push(child.textContent?.trim() || "");
        }
      });
      // Filter out empty strings
      const cleanArray = arrayFromElements.filter(text => text !== "");
      // Map the cleaned array into the required structure
      apiRequest.KeyImprovementsList = cleanArray.map((feedback, index) => ({
        actionStatusID: 0,
        categoryID: 0,
        keyImprovementDesc: feedback,
        keyImprovementsID: ''
      }));

      //Call the service to save the data
      this._ikigaiService.SaveGoingGoodAndKeyImprovements(apiRequest)
        .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
        .subscribe({
          next: (response) => {
            this.loader = false;
            if (response?.isValid) {
              this.markAsCompleted();
              this.goingGoodDisabled = false;
              this.KeyImprovementsDisabled = false;
              this.showSnackBar(response.remarks, SnackBarType.Success);
              this.getTemMembersAndBindFirstEmployeeDetails(false,this.selectedEmpID, this.selectedEmpName);
            }
            else {
              this.showSnackBar(response.remarks, SnackBarType.Error);
            }
          },
          error: (error) => {
            this.handleError(error);
          },
        });
    }
  }

  markAsCompleted() {
    // Logic to mark employees as completed
    this.teamMembers().forEach((member) => {
      if (member.empID === this.selectedEmpID) {
        member.isIkigaiCompleted = true; // Mark as completed
      }
    });
  }

  showSnackBar = (message: string, msgType: string) => {
    this.showSnackbar = true;
    this.snackbarMessge = message;
    this.snackbarType = msgType;
  }

  CloseSnackBar() {
    this.showSnackbar = false;
  }

  getRandomImage(gender: string): string {
    return StaticImages.getRandomImage(gender);
  }

  SaveActionItem() {
    const apiRequest: SaveActionItemRequest = {
      LoggedInUserEmpID: localStorage.getItem('LoggedInEmployeeID') ?? '',
      actionItem: this.ActionItems.map((x) => ({ actionItemID: x.actionItemID, categoryID: x.categoryID, statusID: x.actionStatusID }))
    };

    //console.log('API Request:', apiRequest);
    //Call the service to save the data
    this._ikigaiService.SaveActionItems(apiRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          this.loader = false;
          if (response?.isValid) {
            this.showSnackBar(response.remarks, SnackBarType.Success);
          }
          else {
            this.showSnackBar(response.remarks, SnackBarType.Error);
          }
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  onKeyPress(event: KeyboardEvent) {
    const forbiddenCharacters = ['<', '>', '&', '"', "'"];
    const key = event.key;

    // Check if the typed character is a forbidden one
    if (forbiddenCharacters.includes(key)) {
      event.preventDefault();  // Prevent the character from being entered
      alert('This character is not allowed!');
    }
  }

  applyFilter(event: Event) {
    //console.log('event', event.target);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  sortData(sortState: Sort) {
    const data = this.dataSource.data.slice(); // Make a copy of the data before sorting
    if (!sortState.active || sortState.direction === '') {
      this._liveAnnouncer.announce('Sorting cleared');
      return;
    }

    const sortedData = data.sort((a, b) => {
      const isAsc = sortState.direction === 'asc';
      switch (sortState.active) {
        case 'feedback':
          return this.compare(a.actionItemDesc, b.actionItemDesc, isAsc);
        case 'category':
          return this.compare(a.categoryID, b.categoryID, isAsc);
        case 'addedOn':
          return this.compare(a.createdDate, b.createdDate, isAsc);
        case 'status':
          return this.compare(a.actionStatusID, b.actionStatusID, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource.data = sortedData;
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  }
  //Helper function for comparison (standard for sorting)
  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  setIkigaiDataAvailable() {
    this.isKigigaiDataAvailable = true;
  }
}