import React from 'react';
import { Card } from "@/components/ui/card";
import SummaryCard from './SummaryCard';
import { calculateTotalAssets, calculateAgricultureRate } from '@/utils/zakahCalculations';

interface SummaryProps {
  formData: {
    cash: { amount: number; holdingPeriod: number };
    goldSilver: { gold: number; silver: number; holdingPeriod: number };
    investments: { 
      stocks: number;
      crypto: number;
      otherInvestments: number;
      holdingPeriod: number 
    };
    property: {
      rentalProperties: number;
      personalResidence: boolean;
      rentalIncome: number;
      holdingPeriod: number;
      isForRental: boolean;
    };
    business: {
      inventory: number;
      rawMaterials: number;
      receivables: number;
      cash: number;
      holdingPeriod: number;
    };
    agriculture: {
      type: string;
      value: number;
      expenses: number;
    };
    liabilities: {
      debts: number;
      taxes: number;
      shortTermObligations: number;
    };
  };
}

const Summary = ({ formData }: SummaryProps) => {
  const {
    totalCash,
    totalGoldValue,
    totalInvestments,
    totalPropertyValue,
    annualRentalIncome,
    totalBusinessAssets
  } = calculateTotalAssets(formData);

  // Calculate property Zakat based on purpose
  const propertyZakatableValue = formData.property.isForRental
    ? annualRentalIncome // Only rental income is zakatable for rental properties
    : formData.property.rentalProperties; // Full property value is zakatable if held for selling
  
  const totalWealth = totalCash + totalGoldValue + totalInvestments + 
    (formData.property.isForRental ? annualRentalIncome : propertyZakatableValue) + 
    totalBusinessAssets;
  
  const totalLiabilities = formData.liabilities.debts + 
    formData.liabilities.taxes + 
    formData.liabilities.shortTermObligations;
  
  const netZakatableWealth = totalWealth - totalLiabilities;
  
  const nisabThreshold = 85 * 60; // 85 grams of gold at $60 per gram
  
  const agricultureZakah = (formData.agriculture.value - formData.agriculture.expenses) * 
    calculateAgricultureRate(formData.agriculture.type);
  
  const standardZakah = netZakatableWealth >= nisabThreshold ? netZakatableWealth * 0.025 : 0;
  const totalZakahDue = standardZakah + agricultureZakah;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Zakah Summary</h2>
        <p className="text-gray-600">Review your detailed Zakah calculation below.</p>
      </div>

      <SummaryCard
        title="Assets"
        items={[
          { label: "Cash & Bank", value: totalCash },
          { label: "Gold & Silver", value: totalGoldValue },
          { label: "Investments", value: totalInvestments },
          { 
            label: formData.property.isForRental ? "Annual Rental Income" : "Property Value", 
            value: propertyZakatableValue 
          },
          { label: "Business Assets", value: totalBusinessAssets }
        ]}
        total={{ label: "Total Assets", value: totalWealth, className: "text-zakah-primary" }}
      />

      <SummaryCard
        title="Liabilities"
        items={[
          { label: "Debts", value: formData.liabilities.debts },
          { label: "Taxes", value: formData.liabilities.taxes },
          { label: "Short-term Obligations", value: formData.liabilities.shortTermObligations }
        ]}
        total={{ label: "Total Liabilities", value: totalLiabilities, className: "text-red-500" }}
      />

      <SummaryCard
        title="Agricultural Zakah"
        items={[
          { label: "Produce Value", value: formData.agriculture.value },
          { label: "Expenses", value: formData.agriculture.expenses },
          { label: "Rate Applied", value: `${calculateAgricultureRate(formData.agriculture.type) * 100}%` }
        ]}
        total={{ label: "Agricultural Zakah", value: agricultureZakah, className: "text-zakah-primary" }}
      />

      <Card className={`p-6 ${netZakatableWealth >= nisabThreshold ? 'bg-zakah-light' : 'bg-gray-50'}`}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Nisab Threshold</span>
            <span className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(nisabThreshold)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Net Zakatable Wealth</span>
            <span className="font-medium">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(netZakatableWealth)}</span>
          </div>
          
          <div className="flex justify-between items-center text-lg font-semibold text-zakah-primary">
            <span>Total Zakah Due</span>
            <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalZakahDue)}</span>
          </div>
          
          {netZakatableWealth >= nisabThreshold ? (
            <p className="text-sm text-gray-600 mt-4">
              Your wealth is above the Nisab threshold. For properties, {formData.property.isForRental 
                ? 'only the rental income is subject to Zakah as the property is held for rental purposes.' 
                : 'the full property value is subject to Zakah as it is held for selling.'}
            </p>
          ) : (
            <p className="text-sm text-gray-600 mt-4">
              Your wealth is below the Nisab threshold. However, agricultural Zakah may still be due if applicable.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Summary;