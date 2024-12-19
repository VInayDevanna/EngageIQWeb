/////////////////////////FOR SIDE NAVIGATION MENUS/////////////////////////////////////
export interface NavSubMenus {
  subMenuId:number,
  subMenuName:string,
  navigationPath:string,
  mainMenuId:number
}

export interface NavMenu {
  menuId:number,
  menuName:string,
  navigationPath: string,
  subMenus: NavSubMenus []
}

export interface NavMenuResponse {
  isValid:boolean,
  remarks:string,
  roleName: string;
  userName: string;
  gender: string;
  userID: string;
  menuList:NavMenu[]
}
/////////////////////////////////////

/////////////////////TEAMS MENU/////////////////////////////////////////////////////
export interface NavTeamIndividualSubMenuResponse {
  subMenuId: number,
  subMenuName: string,
  navigationPath: string,
  mainMenuId: number
}

export interface NavTeamIndividualResponse {
  teamID: string,
  teamName: string,
  subMenus: NavTeamIndividualSubMenuResponse[]
}

export interface NavTeamResponse {
  isValid:boolean,
  remarks:string,
  teams: NavTeamIndividualResponse[]
}
////////////////////////////////////////////////