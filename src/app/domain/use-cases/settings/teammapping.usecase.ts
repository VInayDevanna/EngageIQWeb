import { inject, Injectable } from '@angular/core';
import { ELMappingMasterDataResponse, TeamMappingRequest } from '../../../core/models/settings/teammapping.model';
import { ApiService } from '../../../core/services/api.service';
import { ApiNames, HttpMethod } from '../../../Shared/shared.classes';
import { CommonResponse } from '../../../core/models/ikigai-individual/ikigaiIndividual.model';

@Injectable({ providedIn: "root" })
export class TeamMappingService {
  private apiService = inject(ApiService);

  GetTeamMappingMasterData() {
    return this.apiService.callApi<ELMappingMasterDataResponse>(ApiNames.GetTeamMappingData, HttpMethod.GET);
  }

  SaveTeamMapping(data:TeamMappingRequest) {
    return this.apiService.callApi<CommonResponse>(ApiNames.SaveTeamMappingData, HttpMethod.POST, data);
  }
}