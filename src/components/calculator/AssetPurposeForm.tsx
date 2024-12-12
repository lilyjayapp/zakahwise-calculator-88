import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AssetPurposeFormProps {
  data: {
    purpose: string;
    monthlyIncome: number;
    holdingPeriod: number;
  };
  onUpdate: (data: {
    purpose: string;
    monthlyIncome: number;
    holdingPeriod: number;
  }) => void;
}

const AssetPurposeForm = ({ data, onUpdate }: AssetPurposeFormProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Asset Purpose & Income</h2>
        <p className="text-gray-600">Please provide details about your assets' purpose and income.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <Label>Primary Purpose of Assets</Label>
          <RadioGroup
            value={data.purpose}
            onValueChange={(value) => onUpdate({ ...data, purpose: value })}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="personal" id="personal" />
              <Label htmlFor="personal">Personal Use</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="investment" id="investment" />
              <Label htmlFor="investment">Investment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="business" id="business" />
              <Label htmlFor="business">Business Operations</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="trading" id="trading" />
              <Label htmlFor="trading">Trading</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyIncome">Monthly Income from Assets</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="monthlyIncome"
              type="number"
              placeholder="0.00"
              className="pl-8"
              value={data.monthlyIncome || ''}
              onChange={(e) => onUpdate({ ...data, monthlyIncome: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="holdingPeriod">Holding Period (months)</Label>
          <Input
            id="holdingPeriod"
            type="number"
            placeholder="12"
            value={data.holdingPeriod || ''}
            onChange={(e) => onUpdate({ ...data, holdingPeriod: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-zakah-light rounded-lg">
        <p className="text-sm text-gray-600">
          The purpose of your assets and duration of ownership affects your Zakah calculation. Assets held for trading are generally subject to Zakah, while personal use items may be exempt.
        </p>
      </div>
    </div>
  );
};

export default AssetPurposeForm;