import { Component, DestroyRef, inject, Inject, OnDestroy, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { LoginService } from '../../../core/services/login.service';
import { Claim } from '../../../core/models/claim';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private loginService: LoginService
  ) { }

  isLoggedIn = false;
  private readonly _destroying$ = new Subject<void>();
  claims: Claim[] = [];

  async ngOnInit(): Promise<void> {
    this.authService.handleRedirectObservable().subscribe({
      next: async (result) => {
        if (result) {
          this.authService.instance.setActiveAccount(result.account);
          // Call the login API to store last login timestamp
          await this.callLoginAPIToUpdateLastLogin(result.account);
        } else {
          console.log('No redirect result available');
        }
      },
      error: (error) => {
        console.error('Error during redirect handling:', error);
      },
    });

    // Update the login display and account info
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents();

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/login';
        } else {
          this.setLoginDisplay();
        }
      });

    this.loginService.claims$.subscribe((c) => {
      this.claims = c;
    });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  setLoginDisplay() {
    this.isLoggedIn = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();
    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  loginFunction = () => {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  // Function to call the backend API to store last login time
  async callLoginAPIToUpdateLastLogin(account: any) {
    const accessToken = this.authService.instance.getActiveAccount()?.idToken || '';
    if (accessToken) {
      // Call your backend API to store the last login time
      await this.loginService.UpdateLastLogin()
        // .pipe(takeUntilDestroyed(this.destroyRef))  // Automatically unsubscribe on destroy
        .subscribe({
          next: (response) => {            
            if (response.isValid) {
              //store last login 
              localStorage.setItem('LastLogin', response.lastLogin);
              // Only redirect to the dashboard after the login API call succeeds              
              this.router.navigate(['/Dashboard']);
            } else {
              console.log(response.remarks);
            }
          },
          error: (error) => {
            // Handle any errors here
            if (error.status === 401) {
              console.log("Unauthorized access - 401.");
            } else if (error.status === 404) {
              console.log("Resource not found - 404.");
            } else if (error.status === 400) {
              if (error?.error?.errors) {
                const validationMessages = Object.entries(error.error.errors)
                  .map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
                  .join("\n");
                console.log(validationMessages);
              } else if (error?.error?.title) {
                console.log(error.error.title);
              } else {
                console.log("Bad request - 400.");
              }
            } else {
              console.log("An unexpected error occurred: " + error);
            }
          },
        });
    }
  }
}
