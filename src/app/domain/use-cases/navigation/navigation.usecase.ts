import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { NavMenuResponse, NavTeamResponse } from "../../../core/models/navigation/navigation.model";
import { ApiNames, HttpMethod } from "../../../Shared/shared.classes";

@Injectable({ providedIn: "root" })
export class NavigationService {

    private apiService = inject(ApiService);

    GetNavigationMenusBasedOnUser() {
        return this.apiService.callApi<NavMenuResponse>(ApiNames.GetNavigationMenus, HttpMethod.GET);
    }

    GetTeamsAndChildMenusBasedOnUser() {
        return this.apiService.callApi<NavTeamResponse>(ApiNames.GetAllTeams, HttpMethod.GET);
    }
}
