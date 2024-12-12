import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CashFormProps {
  data: { amount: number };
  onUpdate: (data: { amount: number }) => void;
}

const CashForm = ({ data, onUpdate }: CashFormProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Cash & Bank Balances</h2>
        <p className="text-gray-600">Enter the total amount of cash you have in hand and in bank accounts that have been held for a minimum of one calendar year.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="cashAmount">Total Cash Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="cashAmount"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={data.amount || ''}
              onChange={(e) => onUpdate({ amount: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-zakah-light rounded-lg">
        <p className="text-sm text-gray-600">
          Include all cash in hand, checking accounts, savings accounts, and fixed deposits that have been held for at least one lunar year.
        </p>
      </div>
    </div>
  );
};

export default CashForm;