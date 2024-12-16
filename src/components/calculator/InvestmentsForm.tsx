import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface InvestmentsFormProps {
  data: {
    stocks: number;
    crypto: number;
    purpose: string;
    holdingPeriod: number;
  };
  onUpdate: (data: {
    stocks: number;
    crypto: number;
    purpose: string;
    holdingPeriod: number;
  }) => void;
}

const InvestmentsForm = ({ data, onUpdate }: InvestmentsFormProps) => {
  return (
    <div className="space-y-6">
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
            />
          </div>
        </div>

        <div className="space-y-4 border border-black rounded-lg p-4">
          <Label>Investment Purpose</Label>
          <RadioGroup
            value={data.purpose}
            onValueChange={(value) => onUpdate({ ...data, purpose: value })}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="trading" id="trading" />
              <Label htmlFor="trading">Trading</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="long-term" id="long-term" />
              <Label htmlFor="long-term">Long-term Investment</Label>
            </div>
          </RadioGroup>
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
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-zakah-light rounded-lg">
        <p className="text-sm text-gray-600">
          Investments held for trading purposes are subject to Zakah on their full value. Long-term investments may have different considerations.
        </p>
      </div>
    </div>
  );
};

export default InvestmentsForm;