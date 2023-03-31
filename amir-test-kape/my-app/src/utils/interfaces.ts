
export interface IPlan {
  type: string;
  buttonNowType: string;
  title: string;
  price: number | null;
  oldPrice: number | null;
  infoList: IInfoList;
}

export interface IInfoList {
  label: string;
  moreInfo: IMoreInfo[];
}

export interface IMoreInfo {
  infoTitle: string;
  moreInfo: string;
  isMarked: boolean;
  isBold: boolean;
}
