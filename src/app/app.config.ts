import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';
import {
  MsalInterceptor,
  MSAL_INSTANCE,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular';
import { environment } from '../environments/environment';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
export function loggerCallback(logLevel: LogLevel, message: string) {
  //console.log(message);
}

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_susi',
    resetPassword: 'B2C_1_password_reset',
    editProfile: 'B2C_1_profile_edit',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://karthiktechworld.b2clogin.com/karthiktechworld.onmicrosoft.com/B2C_1_susi',
    },
    resetPassword: {
      authority:
        'https://karthiktechworld.b2clogin.com/karthiktechworld.onmicrosoft.com/B2C_1_password_reset',
    },
    editProfile: {
      authority:
        'https://karthiktechworld.b2clogin.com/karthiktechworld.onmicrosoft.com/B2C_1_profile_edit',
    },
  },
  authorityDomain: 'karthiktechworld.b2clogin.com',
};

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.adConfig.clientId,
      authority: `https://login.microsoftonline.com/${environment.adConfig.tenantId}`,
      knownAuthorities: [`login.microsoftonline.com`],
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  //have this set if more microservice used or requires different scope for different controllers
  protectedResourceMap.set(
    environment.adConfig.apiEndpointUrl, // This is for all controllers
    environment.adConfig.scopeUrls
  );
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.adConfig.scopeUrls],
    },
    loginFailedRoute: '/login-failed',
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    importProvidersFrom(
      BrowserModule      
    ),
    provideAnimationsAsync(),
     provideAnimationsAsync(), 
     provideHttpClient(withInterceptorsFromDi(), withFetch()),
     {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService, provideAnimationsAsync(),
    ],
};
