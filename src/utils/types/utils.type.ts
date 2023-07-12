export interface settingInterface {
  title: string;
  baseUrl: string;
  devBaseUrl: string;
  TokenKey: string;
  routerKey: string;
  pagePermission: boolean;
  btnPermissionBoolean: boolean;
  multipleTabs: boolean;
}

export enum TimeNumber {
  future = 1,
  past = -1,
  now = 0,
}
