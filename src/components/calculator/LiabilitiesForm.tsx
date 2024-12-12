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
}

const LiabilitiesForm = ({ data, onUpdate }: LiabilitiesFormProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Liabilities</h2>
        <p className="text-gray-600">Enter your current debts and financial obligations.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="debts">Outstanding Debts</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="debts"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={data.debts || ''}
              onChange={(e) => onUpdate({ ...data, debts: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxes">Due Taxes</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="taxes"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={data.taxes || ''}
              onChange={(e) => onUpdate({ ...data, taxes: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shortTermObligations">Short-term Financial Obligations</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="shortTermObligations"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={data.shortTermObligations || ''}
              onChange={(e) => onUpdate({ ...data, shortTermObligations: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-zakah-light rounded-lg">
        <p className="text-sm text-gray-600">
          Liabilities are deducted from your total assets before calculating Zakah. Include all due debts and financial obligations.
        </p>
      </div>
    </div>
  );
};

export default LiabilitiesForm;