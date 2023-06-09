export const BEST_VALUE = "Best Value";
export const BUY_NOW = 'Buy Now';
export const DISCOUNT = 'Discount';
export const BEST_OFFER_YOU_WILL_GET = 'Best Offer you will get!';
export const FOR_THE_FIRST_YEAR = 'for the first 1 year';
export const BILLED = 'Billed';
export const JWT = 'JWT';
export const EXTENDED = 'Extended';
export const ADVANCED = 'advanced';
export const VPN_ADDON = 'vpn_addon';
export const DAYS_MONEY_BACK_GUARANTEE = '30-day money back guarantee';
export const USER_EVENT_URL = 'http://localhost:4000/userEvents';
export const GET_PRICE_BY_BUNDLE = 'http://localhost:4000/getPriceByBundle/?bundle=*&currency=usd';
export const TITLE_PAGE = 'Get the Ultimate Protection for your PC';
export const SUB_TITLE_PAGE = 'Choose the best plan for your needs';
export const INTEGO_LOGO_IMG_SRC = 'https://antivirus.intego.com/img/mac_av/logo_white.png';
export const COVER_IMG = 'https://antivirus.intego.com/img/mac_av/hero_bg_desktop.webp';

export const getDiscountPerMonthAsString = (discountPerMonth: number | null) => {
  return `Only ${ discountPerMonth }/ month`
}

export const generateInfoTitleForBestValuePlan = (discountPercentage: number | null) => {
  return {
    infoTitle: `Get ${discountPercentage}% OFF `,
    moreInfo: null,
    isMarked: false,
    isBold: true,
  }
}
const SCREEN_MAX_SIZE = {
  mobileL: '767px',
};

export const DEVICE = {
  mobileL: `(max-width: ${SCREEN_MAX_SIZE.mobileL})`,
};


