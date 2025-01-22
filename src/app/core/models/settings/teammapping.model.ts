export interface MappingMasterData {
  name: string;
  id: string;
}

export interface TeamMappingData {
  teamID: string;
  teamName: string;
  cdlEmployeeID: string[];
  smEmployeeID: string;
}

export interface ELMappingMasterDataResponse {
  isValid: boolean;
  remarks: string;
  dataQueriedMonthName: string,
  cdlList: MappingMasterData[];
  smList: MappingMasterData[];
  teamMappingData: TeamMappingData[];
}

//For saving
export interface TeamMapping {
  teamID: string;
  scrumMasterEmployeeID: string;
  commaSeparetedCdlEmployeeID: string;
}

export interface TeamMappingRequest {
  loggedInUserEmpID: string;
  teamMappingList: TeamMapping[];
}
