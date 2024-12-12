import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvestmentsFormProps {
  data: { stocks: number; crypto: number };
  onUpdate: (data: { stocks: number; crypto: number }) => void;
}

const InvestmentsForm = ({ data, onUpdate }: InvestmentsFormProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Investments</h2>
        <p className="text-gray-600">Enter the current market value of your investments.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="stocksAmount">Stocks & Shares</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="stocksAmount"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={data.stocks || ''}
              onChange={(e) => onUpdate({ ...data, stocks: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cryptoAmount">Cryptocurrency</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="cryptoAmount"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={data.crypto || ''}
              onChange={(e) => onUpdate({ ...data, crypto: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-zakah-light rounded-lg">
        <p className="text-sm text-gray-600">
          Include investments held for at least one lunar year. Use current market values for calculation.
        </p>
      </div>
    </div>
  );
};

export default InvestmentsForm;