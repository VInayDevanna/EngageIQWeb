import { Component } from '@angular/core';
import { LayoutsComponent } from "./presentation/layouts/layouts/layouts.component";
import { SignalRService } from './core/services/signalr.service';
import { SnackbarComponent } from "./presentation/components/snackbar/snackbar.component";
import { SnackBarType } from './Shared/shared.classes';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [LayoutsComponent, SnackbarComponent],
})
export class AppComponent {
  title = 'Engage-IQ';
  constructor(private signalRService: SignalRService) {}
  //Snackbar
  showSnackbar: boolean = false;
  snackbarMessge!: string;
  snackbarType!: string;

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.listenForNotifications((message: string) => {   
      //if(localStorage.getItem('LoggedInUserRole')?.toString() == "CDL"){
        this.showSnackBar(message, SnackBarType.Success); 
      //}      
    });
  }

  
  showSnackBar = (message: string, msgType: string) => {
    this.showSnackbar = true;
    this.snackbarMessge = message;
    this.snackbarType = msgType;
  }

  CloseSnackBar(){
    this.showSnackbar = false;
  }
}
