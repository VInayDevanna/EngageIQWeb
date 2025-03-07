


////////////////////////////////////For IKIGAI////////////////////////////////////
export interface TeamMembersResponse{
  currentMonth: string;
  isValid: boolean;
  dataQueriedMonth: string;
  dataQueriedMonthName: string;
  dataQueriedYear: number;
  remarks: string;
  teamMembers: teamMembers[];
}

export interface teamMembers{
  empName:string;
  empID:string;
  gender:string;
  isIkigaiCompleted:boolean;
  empPicture:string;
}

export interface IkigaiDataByEmpIDResponse{
  remarks: string;
  isValid: boolean;
  goingGoodsHTML: string;
  keyImprovementsHTML:string;
  ikigaiID :string;
  actionItems: ActionItems[];
}
export interface ActionItems{
  actionItemID: string;
  actionItemDesc: string;
  categoryID: number;
  actionStatusID: number;
  createdDate: string;
  updatedDate: string;
}

//save action item
export interface SaveActionItemRequest{ 
  LoggedInUserEmpID: string;
  actionItem:ActionItem[];
}

export interface SaveIkigaiSettingRequest{ 
  //LoggedInUserEmpID: string;
  lastDateForIkigai: number;
}

export interface ActionItem{
  actionItemID: string;
  categoryID: number;
  statusID: number;
}
////////////////////////////////////////

export interface keyImprovements{  
  keyImprovementDesc: string;  
}

export interface IkigaiRequest {
  IKIGAIID: string; // Optional ID for the Ikigai record (can be empty)
  LoggedInUserEmpID: string; // Employee ID of the logged-in user
  TeamID: number; // ID of the team
  EmployeeID: string; // Employee ID of the individual
  Month: number; // Month (1-12)
  Year: number; // Year
  GoingGoodHTML: string; // HTML content of the 'Going Good' section
  KeyImprovementsHTML: string; // HTML content of the 'Key Improvements' section 
  KeyImprovementsList: keyImprovements[]; // List of 'KeyImprovements' items
}

export interface CommonResponse {
  isValid: boolean;
  remarks: string;
}

export interface GetIkigaiSettingsResponse {
  lastIkigaiDate: number;
  isValid: boolean;
  remarks: string;
}

export interface MasterDataResponse {
  category: Category[];
  actions: Action[];
  isValid: boolean;
  remarks: string;
}

export interface Category {
  id: number;
  description: string;
}

export interface Action {
  id: number;
  description: string;
}

/////////////////////////////////////////////////////////////////////////////////
// export interface ikigaiIndividualGoingGoodFeedback{
//   id:number;
//   feedback: string;
// }

// export interface ikigaiIndividualImprovementFeedback{
//   id:string;
//   feedback: string;
//   category: string;
//   status: string;
//   addedOn: string;
// }
// export interface ikigaiIndividualFeedbackResponse{
//   goingGood: ikigaiIndividualGoingGoodFeedback[];
//   goingGoodHTML: string;
//   needImprovementsHTML: string;
//   needImprovement: ikigaiIndividualImprovementFeedback[];
// }

// export interface ikigaiIndividualTeamMembersResponse{
//   empID: string;
//   empName: string;
//   empPicture: string;
//   empDesignation: string;
//   empOneToOneStatus: string;
//   ikigaiData: ikigaiIndividualFeedbackResponse;
// }

// export interface ikigaiIndividualTeamsResponse{
//   teamID: string;
//   teamName: string;
//   teamSMName: string;
//   ikigaiStatus: boolean;
//   teamOneToOneStatus: string;
//   teamOneToOneStatusSummary: string;
//   totalTeamMembersCount: number;
//   totalOnetoOneCompletedCount: number;
//   teamMembersList: ikigaiIndividualTeamMembersResponse[];
//   // subMenus: [];
// }

// export interface ikigaiIndividualResponse{
//   currentMonth: string;
//   isValid: boolean;
//   dataQueriedMonth: string;
//   dataQueriedYear: number;
//   remarks: string;
//   teams: ikigaiIndividualTeamsResponse[];
// }
