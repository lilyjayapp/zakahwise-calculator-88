import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SummaryProps {
  formData: {
    cash: { amount: number };
    goldSilver: { gold: number; silver: number };
    investments: { stocks: number; crypto: number };
    assetPurpose: {
      purpose: string;
      monthlyIncome: number;
      holdingPeriod: number;
    };
  };
}

const Summary = ({ formData }: SummaryProps) => {
  const goldPrice = 60; // USD per gram
  const silverPrice = 0.8; // USD per gram
  
  const totalCash = formData.cash.amount;
  const totalGoldValue = formData.goldSilver.gold * goldPrice;
  const totalSilverValue = formData.goldSilver.silver * silverPrice;
  const totalInvestments = formData.investments.stocks + formData.investments.crypto;
  
  // Adjust zakah calculation based on asset purpose and holding period
  const isZakatable = formData.assetPurpose.holdingPeriod >= 12;
  const zakatableAmount = isZakatable ? (
    formData.assetPurpose.purpose === 'trading' || formData.assetPurpose.purpose === 'investment'
      ? totalCash + totalGoldValue + totalSilverValue + totalInvestments
      : formData.assetPurpose.purpose === 'business'
        ? (totalCash + totalInvestments) * 0.75 // Assuming 75% of business assets are zakatable
        : totalCash + totalGoldValue + totalSilverValue
  ) : 0;
  
  const annualIncome = formData.assetPurpose.monthlyIncome * 12;
  const totalWealth = zakatableAmount + (isZakatable ? annualIncome : 0);
  const zakahAmount = totalWealth * 0.025; // 2.5%
  
  const nisabThreshold = 85 * goldPrice; // 85 grams of gold

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
        <p className="text-gray-600">Review your zakah calculation details below.</p>
      </div>

      <Card className="p-6 bg-white shadow-sm">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Cash & Bank</span>
            <span className="font-medium">{formatCurrency(totalCash)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Gold Value</span>
            <span className="font-medium">{formatCurrency(totalGoldValue)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Silver Value</span>
            <span className="font-medium">{formatCurrency(totalSilverValue)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Investments</span>
            <span className="font-medium">{formatCurrency(totalInvestments)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Annual Income from Assets</span>
            <span className="font-medium">{formatCurrency(annualIncome)}</span>
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Zakatable Wealth</span>
            <span className="text-zakah-primary">{formatCurrency(totalWealth)}</span>
          </div>
        </div>
      </Card>

      <Card className={`p-6 ${totalWealth >= nisabThreshold ? 'bg-zakah-light' : 'bg-gray-50'}`}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Nisab Threshold</span>
            <span className="font-medium">{formatCurrency(nisabThreshold)}</span>
          </div>
          
          {totalWealth >= nisabThreshold ? (
            <>
              <div className="flex justify-between items-center text-lg font-semibold text-zakah-primary">
                <span>Zakah Due (2.5%)</span>
                <span>{formatCurrency(zakahAmount)}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Your wealth is above the Nisab threshold. The calculated Zakah amount is due.
                {!isZakatable && " However, some assets haven't completed a full year of ownership."}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-600 mt-2">
              Your wealth is below the Nisab threshold. No Zakah is due at this time.
            </p>
          )}

          <div className="mt-4 p-4 bg-white rounded-lg border border-zakah-primary/10">
            <h3 className="font-medium text-zakah-primary mb-2">Asset Purpose: {formData.assetPurpose.purpose}</h3>
            <p className="text-sm text-gray-600">
              {formData.assetPurpose.purpose === 'trading' 
                ? "Trading assets are fully subject to Zakah."
                : formData.assetPurpose.purpose === 'investment'
                ? "Investment assets are subject to Zakah on their current market value."
                : formData.assetPurpose.purpose === 'business'
                ? "Business assets are partially subject to Zakah based on working capital."
                : "Personal assets are subject to Zakah if they exceed basic needs."}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Summary;