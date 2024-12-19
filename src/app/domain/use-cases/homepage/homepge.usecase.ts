import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { ApiNames, HttpMethod } from "../../../Shared/shared.classes";
import { HomePageResponse } from "../../../core/models/hompage/homepage.model";
import { HttpParams } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class HomePageService {

    private apiService = inject(ApiService);

    GetHomePageData(paramsObj: Record<string, string | undefined> = {}) {
      // Filter out parameters with undefined or empty values
      const params = Object.keys(paramsObj)
          .filter(key => paramsObj[key]) // Keep only keys with non-empty values
          .reduce(
              (httpParams, key) => httpParams.set(key, paramsObj[key] as string),
              new HttpParams()
          );

      return this.apiService.callApi<HomePageResponse>(ApiNames.GetTeamStatistics, HttpMethod.GET, undefined, undefined, params);
  }
}
