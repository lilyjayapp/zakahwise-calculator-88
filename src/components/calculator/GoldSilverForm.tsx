import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GoldSilverFormProps {
  data: { gold: number; silver: number };
  onUpdate: (data: { gold: number; silver: number }) => void;
}

const GoldSilverForm = ({ data, onUpdate }: GoldSilverFormProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Gold & Silver</h2>
        <p className="text-gray-600">Enter the weight of your gold and silver in grams.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goldAmount">Gold (grams)</Label>
          <Input
            id="goldAmount"
            type="number"
            placeholder="0.00"
            value={data.gold || ''}
            onChange={(e) => onUpdate({ ...data, gold: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="silverAmount">Silver (grams)</Label>
          <Input
            id="silverAmount"
            type="number"
            placeholder="0.00"
            value={data.silver || ''}
            onChange={(e) => onUpdate({ ...data, silver: parseFloat(e.target.value) || 0 })}
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-zakah-light rounded-lg">
        <p className="text-sm text-gray-600">
          Include all gold and silver jewelry, coins, and bars that you've owned for at least one lunar year.
        </p>
      </div>
    </div>
  );
};

export default GoldSilverForm;