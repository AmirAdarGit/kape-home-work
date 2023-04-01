
export interface IPlan {
  type: string;
  buttonNowType: string;
  title: string;
  subTitle: string;
  price: number | null;
  oldPrice: number | null;
  isBestValue: boolean;
  discountPercentage: number | null
  monthlyPayment: number | null
  infoList: IInfoList;
}

export interface IInfoList {
  label: string;
  moreInfo: IMoreInfo[];
}

export interface IMoreInfo {
  infoTitle: string;
  moreInfo: string | null;
  isMarked: boolean;
  isBold: boolean;
}


export enum ExternalTrackEvents {
  LANDING_PAGE = 'LANDING_PAGE',
  PRESSED_BUY_NOW_BUTTON = 'PRESSED_BUY_NOW_BUTTON',
}