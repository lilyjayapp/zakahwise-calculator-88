import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CashFormProps {
  data: { 
    amount: number;
    holdingPeriod: number;
  };
  onUpdate: (data: { 
    amount: number;
    holdingPeriod: number;
  }) => void;
  onNext?: () => void;
}

const CashForm = ({ data, onUpdate, onNext }: CashFormProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      const inputs = form?.querySelectorAll('input');
      const currentIndex = Array.from(inputs || []).indexOf(e.target as HTMLInputElement);
      
      if (inputs && currentIndex === inputs.length - 1) {
        // If it's the last input, trigger next
        onNext?.();
      } else if (inputs && inputs[currentIndex + 1]) {
        // Otherwise focus next input
        inputs[currentIndex + 1].focus();
      }
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onNext?.();
    }} className="space-y-1">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-zakah-primary">Cash & Bank Balances</h2>
        <p className="text-gray-600 max-w-lg mx-auto text-xs">
          Enter the total amount of cash you have in hand and in bank accounts. Include checking accounts, savings accounts, and fixed deposits that have been held for a minimum of one calendar year.
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-1">
          <Label htmlFor="cashAmount" className="text-base font-semibold">Total Cash Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base">$</span>
            <Input
              id="cashAmount"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.amount || ''}
              onChange={(e) => onUpdate({ 
                ...data,
                amount: parseFloat(e.target.value) || 0 
              })}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="holdingPeriod" className="text-base font-semibold">Holding Period (months)</Label>
          <Input
            id="holdingPeriod"
            type="number"
            placeholder="12"
            className="h-11 text-lg font-bold border-black border-[1px]"
            value={data.holdingPeriod || ''}
            onChange={(e) => onUpdate({ 
              ...data,
              holdingPeriod: parseFloat(e.target.value) || 0 
            })}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-zakah-light rounded-lg">
        <p className="text-xs text-gray-600">
          Note: Cash is only considered for Zakah if it has been held for at least one lunar year (12 months).
        </p>
      </div>
    </form>
  );
};

export default CashForm;
