import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SummaryProps {
  formData: {
    cash: { amount: number; holdingPeriod: number };
    goldSilver: { gold: number; silver: number; holdingPeriod: number };
    investments: { 
      stocks: number;
      crypto: number;
      purpose: string;
      holdingPeriod: number 
    };
    property: {
      rentalProperties: number;
      personalResidence: boolean;
      rentalIncome: number;
      holdingPeriod: number;
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
  const goldPrice = 60; // USD per gram
  const silverPrice = 0.8; // USD per gram
  
  // Calculate total assets
  const totalCash = formData.cash.amount || 0;
  const totalGoldValue = formData.goldSilver.holdingPeriod >= 12 
    ? (formData.goldSilver.gold * goldPrice + formData.goldSilver.silver * silverPrice)
    : 0;
  
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
  
  // Calculate agricultural zakah
  const getAgricultureRate = (type: string) => {
    switch (type) {
      case 'natural': return 0.10;
      case 'irrigated': return 0.05;
      case 'mixed': return 0.075;
      default: return 0.05;
    }
  };
  
  const agricultureZakah = (formData.agriculture.value - formData.agriculture.expenses) * 
    getAgricultureRate(formData.agriculture.type);
  
  // Calculate total liabilities
  const totalLiabilities = formData.liabilities.debts + 
    formData.liabilities.taxes + 
    formData.liabilities.shortTermObligations;
  
  // Calculate net wealth
  const totalWealth = totalCash + totalGoldValue + totalInvestments + 
    totalPropertyValue + annualRentalIncome + totalBusinessAssets;
  
  const netZakatableWealth = totalWealth - totalLiabilities;
  
  // Calculate nisab threshold (85 grams of gold)
  const nisabThreshold = 85 * goldPrice;
  
  // Calculate standard zakah (2.5%)
  const standardZakah = netZakatableWealth >= nisabThreshold ? netZakatableWealth * 0.025 : 0;
  
  // Total zakah due
  const totalZakahDue = standardZakah + agricultureZakah;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Zakah Summary</h2>
        <p className="text-gray-600">Review your detailed Zakah calculation below.</p>
      </div>

      <Card className="p-6 bg-white shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Assets</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Cash & Bank</span>
            <span className="font-medium">{formatCurrency(totalCash)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Gold & Silver</span>
            <span className="font-medium">{formatCurrency(totalGoldValue)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Investments</span>
            <span className="font-medium">{formatCurrency(totalInvestments)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Property Value</span>
            <span className="font-medium">{formatCurrency(totalPropertyValue)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Annual Rental Income</span>
            <span className="font-medium">{formatCurrency(annualRentalIncome)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Business Assets</span>
            <span className="font-medium">{formatCurrency(totalBusinessAssets)}</span>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between font-semibold">
            <span>Total Assets</span>
            <span className="text-zakah-primary">{formatCurrency(totalWealth)}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Liabilities</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Debts</span>
            <span className="font-medium">{formatCurrency(formData.liabilities.debts)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Taxes</span>
            <span className="font-medium">{formatCurrency(formData.liabilities.taxes)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Short-term Obligations</span>
            <span className="font-medium">{formatCurrency(formData.liabilities.shortTermObligations)}</span>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between font-semibold">
            <span>Total Liabilities</span>
            <span className="text-red-500">{formatCurrency(totalLiabilities)}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white shadow-sm">
        <h3 className="font-semibold text-lg mb-4">Agricultural Zakah</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Produce Value</span>
            <span className="font-medium">{formatCurrency(formData.agriculture.value)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Expenses</span>
            <span className="font-medium">{formatCurrency(formData.agriculture.expenses)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Rate Applied</span>
            <span className="font-medium">{getAgricultureRate(formData.agriculture.type) * 100}%</span>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between font-semibold">
            <span>Agricultural Zakah</span>
            <span className="text-zakah-primary">{formatCurrency(agricultureZakah)}</span>
          </div>
        </div>
      </Card>

      <Card className={`p-6 ${netZakatableWealth >= nisabThreshold ? 'bg-zakah-light' : 'bg-gray-50'}`}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Nisab Threshold</span>
            <span className="font-medium">{formatCurrency(nisabThreshold)}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Net Zakatable Wealth</span>
            <span className="font-medium">{formatCurrency(netZakatableWealth)}</span>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between items-center text-lg font-semibold text-zakah-primary">
            <span>Total Zakah Due</span>
            <span>{formatCurrency(totalZakahDue)}</span>
          </div>
          
          {netZakatableWealth >= nisabThreshold ? (
            <p className="text-sm text-gray-600 mt-4">
              Your wealth is above the Nisab threshold. The calculated Zakah includes both standard wealth Zakah (2.5%) 
              and agricultural Zakah based on irrigation method.
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