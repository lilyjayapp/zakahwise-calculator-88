import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SummaryProps {
  formData: {
    cash: { amount: number };
    goldSilver: { gold: number; silver: number };
    investments: { stocks: number; crypto: number };
  };
}

const Summary = ({ formData }: SummaryProps) => {
  const goldPrice = 60; // USD per gram
  const silverPrice = 0.8; // USD per gram
  
  const totalCash = formData.cash.amount;
  const totalGoldValue = formData.goldSilver.gold * goldPrice;
  const totalSilverValue = formData.goldSilver.silver * silverPrice;
  const totalInvestments = formData.investments.stocks + formData.investments.crypto;
  
  const totalWealth = totalCash + totalGoldValue + totalSilverValue + totalInvestments;
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
          
          <Separator className="my-4" />
          
          <div className="flex justify-between text-lg font-semibold">
            <span>Total Wealth</span>
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
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-600 mt-2">
              Your wealth is below the Nisab threshold. No Zakah is due at this time.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Summary;