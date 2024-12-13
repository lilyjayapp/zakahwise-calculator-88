import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CashFormProps {
  data: { amount: number };
  onUpdate: (data: { amount: number }) => void;
}

const CashForm = ({ data, onUpdate }: CashFormProps) => {
  return (
    <div className="space-y-1">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-zakah-primary">Cash & Bank Balances</h2>
        <p className="text-gray-600 max-w-lg mx-auto text-xs">
          Enter the total amount of cash you have in hand and in bank accounts. Include all checking accounts, savings accounts, and fixed deposits that have been held for a minimum of one calendar year.
        </p>
      </div>

      <div className="space-y-1 max-w-md mx-auto">
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
              onChange={(e) => onUpdate({ amount: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="bg-zakah-light rounded-lg p-2">
          <p className="text-xs text-gray-600">
            Include all cash in hand, checking accounts, savings accounts, and fixed deposits that have been held for at least one lunar year.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CashForm;