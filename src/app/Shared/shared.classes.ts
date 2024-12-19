export class ApiNames
{
  static readonly GetNavigationMenus = 'GetNavigationMenus';
  static readonly GetAllTeams = 'Teams/GetAllTeams';
  static readonly GetTeamStatistics = 'Teams/GetTeamStatistics';
  static readonly GeTeamMembersByTeamID = 'Teams/GeTeamMembersByTeamID';
  static readonly GetIkigaiDataByUserID = 'Ikigai/GetIkigaiDataByUserID';
  static readonly SaveGoingGoodAndKeyImprovements = 'Ikigai/SaveIkigaiData';
  static readonly GetIkigaiMasterData = 'Ikigai/GetIkigaiMasterData';
  static readonly SaveActionItem = 'Ikigai/SaveActionItem';
}

export class HttpMethod
{
  static readonly GET = 'GET';
  static readonly PUT = 'PUT';
  static readonly POST = 'POST';
  static readonly DELETE = 'DELETE';
}

export class StaticImages 
{
  static readonly maleImages = [
    'assets/Avatars/M/Default.jpeg',
    'assets/Avatars/M/Gemini_Generated_Image_b4v3phb4v3phb4v3.jpeg',
    'assets/Avatars/M/Gemini_Generated_Image_clnrqvclnrqvclnr.jpeg',
    'assets/Avatars/M/Gemini_Generated_Image_enhkgeenhkgeenhk.jpeg',
    'assets/Avatars/M/Gemini_Generated_Image_gc6207gc6207gc62.jpeg',
    'assets/Avatars/M/Gemini_Generated_Image_mo6jucmo6jucmo6j.jpeg',
    'assets/Avatars/M/Gemini_Generated_Image_nx6uyxnx6uyxnx6u.jpeg'
  ];

  static readonly femaleImages = [
    'assets/Avatars/F/Default.jpeg',
    'assets/Avatars/F/Gemini_Generated_Image_iisyd0iisyd0iisy.jpeg',
    'assets/Avatars/F/Gemini_Generated_Image_juzxejjuzxejjuzx.jpeg',
    'assets/Avatars/F/Gemini_Generated_Image_m8oeykm8oeykm8oe.jpeg',
    'assets/Avatars/F/Gemini_Generated_Image_r1m4gur1m4gur1m4.jpeg',
    'assets/Avatars/F/Gemini_Generated_Image_r2zfkqr2zfkqr2zf.jpeg',
    'assets/Avatars/F/Gemini_Generated_Image_y5ema6y5ema6y5em.jpeg'
  ];

  static getRandomImage(gender: string): string {
    const images = gender.toUpperCase() === 'MALE' ? this.maleImages : this.femaleImages;
    return images[Math.floor(Math.random() * images.length)];
  }
}

export enum PanelList {
  GoingGood = 'goingGood',
  KeyImprovements = 'keyImprovements',
  ImprovementsFeedback = 'improvementsFeedback!',
  CancelFeedBack='CancelFeedBack',
  CancelActionItem='CancelAactionItem'
}

export enum SnackBarType {
  Success = 'success',
  Error = 'error'
}