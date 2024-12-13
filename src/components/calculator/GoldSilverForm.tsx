import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GoldSilverFormProps {
  data: { gold: number; silver: number };
  onUpdate: (data: { gold: number; silver: number }) => void;
}

const GoldSilverForm = ({ data, onUpdate }: GoldSilverFormProps) => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-zakah-primary">Gold & Silver</h2>
        <p className="text-gray-600 text-sm">Enter the monetary value of your gold and silver holdings.</p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="goldAmount">Gold Value ($)</Label>
          <Input
            id="goldAmount"
            type="number"
            placeholder="0.00"
            value={data.gold || ''}
            onChange={(e) => onUpdate({ ...data, gold: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="silverAmount">Silver Value ($)</Label>
          <Input
            id="silverAmount"
            type="number"
            placeholder="0.00"
            value={data.silver || ''}
            onChange={(e) => onUpdate({ ...data, silver: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="mt-4 p-3 bg-zakah-light rounded-lg">
        <p className="text-xs text-gray-600">
          Enter the current market value of all gold and silver jewelry, coins, and bars that you've owned for at least one lunar year.
        </p>
      </div>
    </div>
  );
};

export default GoldSilverForm;