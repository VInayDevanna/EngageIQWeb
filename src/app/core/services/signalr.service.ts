import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  private baseUrl = `${environment.apiUrl.replace('api/', 'notificationHub')}`;
  private maxRetryAttempts = 4; // Limit to 3 retry attempts
  private currentRetryCount = 0; // Track the number of retries

  constructor() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl, {
        accessTokenFactory: () => {
          const employeeId = localStorage.getItem('LoggedInEmployeeID');
          return employeeId ? employeeId : ''; 
        },
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000])// Retry after 0ms, 2s, 5s, 10s
      .build()     
  }

  startConnection() {
    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR connection started successfully');
        this.currentRetryCount = 0; // Reset retry count on success
      })
      .catch((err) => {
        console.error('Error while starting SignalR connection:', err);
        this.handleReconnect();
      });
  }

  private handleReconnect() {
    if (this.currentRetryCount < this.maxRetryAttempts) {
      this.currentRetryCount++;
      console.log(`Retrying SignalR connection (${this.currentRetryCount}/${this.maxRetryAttempts})...`);
      setTimeout(() => {
        this.startConnection();
      }, this.getRetryDelay(this.currentRetryCount));
    } else {
      console.error('Maximum retry attempts reached. Could not establish SignalR connection.');
    }
  }

  private getRetryDelay(retryCount: number): number {
    // Exponential backoff: 1000ms, 2000ms, 4000ms
    return Math.pow(2, retryCount - 1) * 1000;
  }

  listenForNotifications(callback: (message: string) => void) {
    this.hubConnection.on('ReceiveNotification', callback);
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => console.log('SignalR connection stopped'))
        .catch((err) => console.error('Error while stopping SignalR connection:', err));
    }
  }
}