import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IkigaiService } from '../../../../domain/use-cases/ikigai-individual/ikigaiIndividual-data.use-case';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CustomErrorHandler } from '../../../../Shared/custom.errormessage';
import { SnackBarType } from '../../../../Shared/shared.classes';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderComponent } from "../../../components/loader/loader.component";
import { SnackbarComponent } from "../../../components/snackbar/snackbar.component";
import { SaveIkigaiSettingRequest } from '../../../../core/models/ikigai-individual/ikigaiIndividual.model';

@Component({
  selector: 'app-ikigaiconfig',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, SnackbarComponent],
  templateUrl: './ikigaiconfig.component.html',
  styleUrl: './ikigaiconfig.component.scss'
})
export class IkigaiconfigComponent implements OnInit {

  //Inject Service
  private _ikigaiService = inject(IkigaiService);
  private destroyRef = inject(DestroyRef);

  loader: boolean = false;
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;

  ikigaiSettingsform = new FormGroup({
    LastDateForIkigai: new FormControl('', {
      validators: [Validators.required]
    }),
  });

  ngOnInit(): void {
    this.GetIkigaiSettings();
  }

  GetIkigaiSettings() {
    // Call the service to get the ikigai settings
    this.loader = true;
    this._ikigaiService.GetIkigaiSettings()
      .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
      .subscribe({
        next: (response) => {
          this.loader = false;
          if (response?.isValid) {
            //store locally the last date for ikigai
            localStorage.setItem('lastIkigaiDate', response.lastIkigaiDate.toString());
            this.ikigaiSettingsform.patchValue({
              LastDateForIkigai: response.lastIkigaiDate.toString()
            });
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

  isNumberKey(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    return charCode >= 48 && charCode <= 57; // Allow only numbers (0-9)
  }

  onSubmit() {
    if (this.ikigaiSettingsform.valid) {
      // Create API request object
      const apiRequest: SaveIkigaiSettingRequest = {
        //loggedInUserEmpID: localStorage.getItem('LoggedInEmployeeID') || '',
        lastDateForIkigai: parseInt(this.ikigaiSettingsform.value.LastDateForIkigai ?? '0')
      };
      this._ikigaiService.SaveIkigaiSettings(apiRequest)
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
  }
}
