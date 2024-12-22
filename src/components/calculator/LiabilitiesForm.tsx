import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LiabilitiesFormProps {
  data: {
    debts: number;
    taxes: number;
    shortTermObligations: number;
  };
  onUpdate: (data: {
    debts: number;
    taxes: number;
    shortTermObligations: number;
  }) => void;
  onNext?: () => void;
}

const LiabilitiesForm = ({ data, onUpdate, onNext }: LiabilitiesFormProps) => {
  return (
    <div className="space-y-3">
      <div className="text-center mb-3">
        <h2 className="text-lg font-semibold text-zakah-primary">Liabilities</h2>
        <p className="text-sm text-gray-600">Deduct liabilities, like debts and financial obligations, from your total assets when calculating Zakat. Choose a fixed due date each year to calculate and pay your Zakat consistently.</p>
      </div>

      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="debts" className="text-sm">Outstanding Debts (Business and Personal)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="debts"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.debts || ''}
              onChange={(e) => onUpdate({ ...data, debts: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="taxes" className="text-sm">Due Taxes</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="taxes"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.taxes || ''}
              onChange={(e) => onUpdate({ ...data, taxes: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="shortTermObligations" className="text-sm">Short-term Financial Obligations (payable before your Zakat's yearly due date)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="shortTermObligations"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.shortTermObligations || ''}
              onChange={(e) => onUpdate({ ...data, shortTermObligations: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>

      <div className="mt-2 p-2 bg-zakah-light rounded-lg">
        <p className="text-xs text-gray-600"></p>
      </div>
    </div>
  );
};

export default LiabilitiesForm;