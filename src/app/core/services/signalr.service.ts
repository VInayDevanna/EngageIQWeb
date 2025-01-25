import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private baseUrl = `${environment.apiUrl}`;
  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl( this.baseUrl.replace('api/','notificationHub'))
      .build();
  }

  startConnection() {
    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.log('Error while starting SignalR connection: ', err));
  }

  listenForNotifications(callback: (message: string) => void) {
    this.hubConnection.on('ReceiveNotification', callback);
  }
}
