export const GOLD_PRICE = 60; // USD per gram
export const SILVER_PRICE = 0.8; // USD per gram

export const calculateTotalGoldSilver = (gold: number, silver: number, holdingPeriod: number) => {
  if (holdingPeriod < 12) return 0;
  return gold + silver;
};

export const calculateAgricultureRate = (type: string) => {
  switch (type) {
    case 'natural': return 0.10;
    case 'irrigated': return 0.05;
    case 'mixed': return 0.075;
    default: return 0.05;
  }
};

export const calculateTotalAssets = (formData: any) => {
  // Calculate cash only if holding period is 12 months or more
  const totalCash = formData.cash.holdingPeriod >= 12 ? formData.cash.amount : 0;
  
  const totalGoldValue = calculateTotalGoldSilver(
    formData.goldSilver.gold,
    formData.goldSilver.silver,
    formData.goldSilver.holdingPeriod
  );
  
  const totalInvestments = formData.investments.holdingPeriod >= 12
    ? formData.investments.stocks + formData.investments.crypto
    : 0;
  
  const totalPropertyValue = formData.property.holdingPeriod >= 12
    ? (formData.property.personalResidence ? 0 : formData.property.rentalProperties)
    : 0;
  
  const annualRentalIncome = formData.property.rentalIncome * 12;
  
  const totalBusinessAssets = formData.business.holdingPeriod >= 12
    ? (formData.business.inventory + formData.business.rawMaterials + 
       formData.business.receivables + formData.business.cash)
    : 0;

  return {
    totalCash,
    totalGoldValue,
    totalInvestments,
    totalPropertyValue,
    annualRentalIncome,
    totalBusinessAssets
  };
};