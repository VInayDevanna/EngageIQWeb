// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { EnvironmentConfiguration } from "../app/core/models/environment-configuration";

const serverUrl='https://localhost:7100/api/';//'https://engageiqapi.azurewebsites.net/api/'; //


// The list of file replacements can be found in `angular.json`.
export const environment: EnvironmentConfiguration = {
  env_name: 'dev',
  production: true,
  apiUrl: serverUrl,
  apiEndpoints: {
    userProfile:'user-profiles'
  },
  adConfig: {
    clientId: '8f65506a-c5f2-4d87-845e-a99714cdbd58',
    readScopeUrl: 'api://4d7e52e7-4bb1-4764-8fd2-c7f1ec9a0982/EngageIQ.Read',
    writeScopeUrl: 'api://4d7e52e7-4bb1-4764-8fd2-c7f1ec9a0982/EngageIQ.Write',
    scopeUrls: [
      'api://4d7e52e7-4bb1-4764-8fd2-c7f1ec9a0982/EngageIQ.Read',
      'api://4d7e52e7-4bb1-4764-8fd2-c7f1ec9a0982/EngageIQ.Write'
    ],
    apiEndpointUrl: 'https://localhost:7100/api/',//'https://engageiqapi.azurewebsites.net/api/', //
    tenantId: "24b080cd-5874-44ab-9862-8d7e0e0781ab"
  },
  cacheTimeInMinutes: 30,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
