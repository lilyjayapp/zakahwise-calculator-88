import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvestmentsFormProps {
  data: {
    stocks: number;
    crypto: number;
    otherInvestments: number;
    holdingPeriod: number;
  };
  onUpdate: (data: {
    stocks: number;
    crypto: number;
    otherInvestments: number;
    holdingPeriod: number;
  }) => void;
  onNext?: () => void;
}

const InvestmentsForm = ({ data, onUpdate, onNext }: InvestmentsFormProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      const inputs = form?.querySelectorAll('input');
      const currentIndex = Array.from(inputs || []).indexOf(e.target as HTMLInputElement);
      
      if (inputs && currentIndex === inputs.length - 1) {
        onNext?.();
      } else if (inputs && inputs[currentIndex + 1]) {
        inputs[currentIndex + 1].focus();
      }
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onNext?.();
    }} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Investments</h2>
        <p className="text-gray-600">Enter details about your investment holdings.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="stocks">Stocks Value</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="stocks"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.stocks || ''}
              onChange={(e) => onUpdate({ ...data, stocks: parseFloat(e.target.value) || 0 })}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="crypto">Cryptocurrency Value</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="crypto"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.crypto || ''}
              onChange={(e) => onUpdate({ ...data, crypto: parseFloat(e.target.value) || 0 })}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="space-y-2 border border-black rounded-lg p-4">
          <Label htmlFor="otherInvestments">Other Investments</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="otherInvestments"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.otherInvestments || ''}
              onChange={(e) => onUpdate({ ...data, otherInvestments: parseFloat(e.target.value) || 0 })}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="holdingPeriod">Holding Period (months)</Label>
          <Input
            id="holdingPeriod"
            type="number"
            placeholder="12"
            className="h-11 text-lg font-bold border-black border-[1px]"
            value={data.holdingPeriod || ''}
            onChange={(e) => onUpdate({ ...data, holdingPeriod: parseFloat(e.target.value) || 0 })}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-zakah-light rounded-lg">
        <p className="text-sm text-gray-600">
          Investments held for trading purposes are subject to Zakah on their full value. Long-term investments may have different considerations.
        </p>
      </div>
    </form>
  );
};

export default InvestmentsForm;