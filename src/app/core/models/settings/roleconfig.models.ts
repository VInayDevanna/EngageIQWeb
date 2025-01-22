export interface RoleConfigData {
    roleID: number;
    pageAccessData: string;
}

export interface PageData {
    pageID: number;
    pageName: string;
}

export interface RoleConfigResponse {
    isValid: boolean;
    remarks: string;
    roleConfigData: RoleConfigData[];
    pageData: PageData[];
}

