import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CashFormProps {
  data: { amount: number };
  onUpdate: (data: { amount: number }) => void;
}

const CashForm = ({ data, onUpdate }: CashFormProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-zakah-primary mb-2">Cash & Bank Balances</h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-4 text-sm">
          Enter the total amount of cash you have in hand and in bank accounts that have been held for a minimum of one lunar year.
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        <div className="space-y-1">
          <Label htmlFor="cashAmount" className="text-lg font-semibold">Total Cash Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">$</span>
            <Input
              id="cashAmount"
              type="number"
              placeholder="0.00"
              className="pl-8 h-12 text-xl font-bold"
              value={data.amount || ''}
              onChange={(e) => onUpdate({ amount: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="p-3 bg-zakah-light rounded-lg">
          <p className="text-xs text-gray-600">
            Include all cash in hand, checking accounts, savings accounts, and fixed deposits that have been held for at least one lunar year.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CashForm;