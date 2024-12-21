export const calculateTotalAssets = (formData: any) => {
  const totalCash = formData.cash.amount;
  const totalGoldValue = formData.goldSilver.gold + formData.goldSilver.silver;
  const totalInvestments = formData.investments.stocks + 
    formData.investments.crypto + 
    formData.investments.otherInvestments;
  const totalPropertyValue = formData.property.rentalProperties;
  const annualRentalIncome = formData.property.rentalIncome * 12;
  const totalBusinessAssets = formData.business.inventory + 
    formData.business.rawMaterials + 
    formData.business.receivables + 
    formData.business.cash;

  return {
    totalCash,
    totalGoldValue,
    totalInvestments,
    totalPropertyValue,
    annualRentalIncome,
    totalBusinessAssets
  };
};

export const calculateAgricultureRate = (type: string) => {
  switch (type) {
    case 'natural':
      return 0.1;
    case 'irrigated':
      return 0.05;
    case 'both':
      return 0.075;
    default:
      return 0.1;
  }
};