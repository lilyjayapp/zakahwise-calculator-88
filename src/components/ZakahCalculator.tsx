import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calculator, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import CashForm from './calculator/CashForm';
import GoldSilverForm from './calculator/GoldSilverForm';
import InvestmentsForm from './calculator/InvestmentsForm';
import PropertyForm from './calculator/PropertyForm';
import BusinessForm from './calculator/BusinessForm';
import LiabilitiesForm from './calculator/LiabilitiesForm';
import AgricultureForm from './calculator/AgricultureForm';
import Summary from './calculator/Summary';

const steps = [
  "Cash & Bank",
  "Gold & Silver",
  "Investments",
  "Properties",
  "Business Assets",
  "Agriculture",
  "Liabilities",
  "Summary"
];

export const ZakahCalculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    cash: { amount: 0, holdingPeriod: 12 },
    goldSilver: { gold: 0, silver: 0, holdingPeriod: 12 },
    investments: { 
      stocks: 0, 
      crypto: 0,
      otherInvestments: 0,
      holdingPeriod: 12 
    },
    property: {
      rentalProperties: 0,
      personalResidence: false,
      rentalIncome: 0,
      holdingPeriod: 12,
      isForRental: true  // Set to true by default
    },
    business: {
      inventory: 0,
      rawMaterials: 0,
      receivables: 0,
      cash: 0,
      holdingPeriod: 12
    },
    agriculture: {
      type: 'irrigated',
      value: 0,
      expenses: 0
    },
    liabilities: {
      debts: 0,
      taxes: 0,
      shortTermObligations: 0
    }
  });
  
  const { toast } = useToast();

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      // Scroll to top when moving to next step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Scroll to top when moving to previous step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFormData = (section: keyof typeof formData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
    toast({
      title: "Progress Saved",
      description: "Your information has been updated.",
      duration: 1500,
      className: "absolute bottom-20 right-[200px] w-[200px]",
      open: true,
      onOpenChange: () => {},
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CashForm data={formData.cash} onUpdate={(data) => updateFormData('cash', data)} onNext={handleNext} />;
      case 1:
        return <GoldSilverForm data={formData.goldSilver} onUpdate={(data) => updateFormData('goldSilver', data)} onNext={handleNext} />;
      case 2:
        return <InvestmentsForm data={formData.investments} onUpdate={(data) => updateFormData('investments', data)} onNext={handleNext} />;
      case 3:
        return <PropertyForm data={formData.property} onUpdate={(data) => updateFormData('property', data)} onNext={handleNext} />;
      case 4:
        return <BusinessForm data={formData.business} onUpdate={(data) => updateFormData('business', data)} onNext={handleNext} />;
      case 5:
        return <AgricultureForm data={formData.agriculture} onUpdate={(data) => updateFormData('agriculture', data)} onNext={handleNext} />;
      case 6:
        return <LiabilitiesForm data={formData.liabilities} onUpdate={(data) => updateFormData('liabilities', data)} onNext={handleNext} />;
      case 7:
        return <Summary formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zakah-light to-white p-1 sm:p-2 md:p-3">
      <Card className="max-w-2xl mx-auto p-3 shadow-lg border-zakah-primary/10 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Calculator className="w-5 h-5 text-zakah-primary" />
          <h1 className="text-xl font-semibold text-zakah-primary">Zakah Calculator</h1>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between mb-1 text-xs text-gray-600">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <span>{steps[currentStep]}</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="min-h-[300px] animate-fade-in">
          {renderStep()}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-2">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="border-zakah-primary text-zakah-primary hover:bg-zakah-light text-sm h-8"
            >
              <ArrowLeft className="w-3 h-3 mr-1" />
              Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              className="bg-zakah-primary hover:bg-zakah-accent text-white text-sm h-8"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};