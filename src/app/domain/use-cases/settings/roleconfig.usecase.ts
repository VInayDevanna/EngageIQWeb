import { inject, Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { RoleConfigResponse } from "../../../core/models/settings/roleconfig.models";
import { CommonResponse } from "../../../core/models/ikigai-individual/ikigaiIndividual.model";
import { ApiNames, HttpMethod } from "../../../Shared/shared.classes";

@Injectable({ providedIn: "root" })
export class RoleConfigService {
  private apiService = inject(ApiService);

  GetRolesData() {
    return this.apiService.callApi<RoleConfigResponse>(ApiNames.GetRoles, HttpMethod.GET);
  }

  SaveRoleConfig(data:any) {
    return this.apiService.callApi<CommonResponse>(ApiNames.SaveRoles, HttpMethod.POST, data);
  }
}