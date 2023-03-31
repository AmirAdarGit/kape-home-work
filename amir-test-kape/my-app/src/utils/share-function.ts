


export const getDiscountPercentageFunc = (oldPrice: number, newPrice: number) => {
  return Math.floor(((Number(oldPrice) - Number(newPrice))/Number(oldPrice)) * 100);
}

export const getDiscountPerMonthFunc = (newPrice: number) => {
  return Number((newPrice/12).toFixed(2));
}

