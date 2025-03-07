import { inject, Injectable } from '@angular/core';
import { CommonResponse, GetIkigaiSettingsResponse, IkigaiDataByEmpIDResponse, IkigaiRequest, MasterDataResponse, SaveActionItemRequest, SaveIkigaiSettingRequest, TeamMembersResponse } from "../../../core/models/ikigai-individual/ikigaiIndividual.model"
import { ApiService } from '../../../core/services/api.service';
import { HttpParams } from '@angular/common/http';
import { ApiNames, HttpMethod } from '../../../Shared/shared.classes';

@Injectable({
  providedIn: 'root'
})
export class IkigaiService {
  private apiService = inject(ApiService);

  GetMasterData() {
    return this.apiService.callApi<MasterDataResponse>(ApiNames.GetIkigaiMasterData, HttpMethod.GET);
  }

  SaveIkigaiSettings(data:SaveIkigaiSettingRequest) {
    return this.apiService.callApi<CommonResponse>(ApiNames.SaveIkigaiSettings, HttpMethod.PUT, data);
  }

  GetIkigaiSettings() {
    return this.apiService.callApi<GetIkigaiSettingsResponse>(ApiNames.GetIkigaiSettings, HttpMethod.GET);
  }

  GetTeamMembersByTeamID(paramsObj: Record<string, string | undefined> = {}) {
    const params = Object.keys(paramsObj)
      .filter(key => paramsObj[key]) // Keep only keys with non-empty values
      .reduce(
        (httpParams, key) => httpParams.set(key, paramsObj[key] as string),
        new HttpParams()
      );
    return this.apiService.callApi<TeamMembersResponse>(ApiNames.GeTeamMembersByTeamID, HttpMethod.GET, undefined, undefined, params);
  }

  GetIkigaiActionItemsByUserID(paramsObj: Record<string, string | undefined> = {}) {
    const params = Object.keys(paramsObj)
      .filter(key => paramsObj[key]) // Keep only keys with non-empty values
      .reduce(
        (httpParams, key) => httpParams.set(key, paramsObj[key] as string),
        new HttpParams()
      );
    return this.apiService.callApi<IkigaiDataByEmpIDResponse>(ApiNames.GetIkigaiDataByUserID, HttpMethod.GET, undefined, undefined, params);
  }

  SaveGoingGoodAndKeyImprovements(data:IkigaiRequest) {
    return this.apiService.callApi<CommonResponse>(ApiNames.SaveGoingGoodAndKeyImprovements, HttpMethod.POST, data);
  }

  SaveActionItems(data:SaveActionItemRequest) {
    return this.apiService.callApi<CommonResponse>(ApiNames.SaveActionItem, HttpMethod.POST, data);
  }
}