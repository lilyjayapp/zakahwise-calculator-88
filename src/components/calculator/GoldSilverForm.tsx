import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GoldSilverFormProps {
  data: {
    gold: number;
    silver: number;
    holdingPeriod: number;
  };
  onUpdate: (data: {
    gold: number;
    silver: number;
    holdingPeriod: number;
  }) => void;
  onNext?: () => void;
}

const GoldSilverForm = ({ data, onUpdate, onNext }: GoldSilverFormProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      const inputs = form?.querySelectorAll('input');
      const currentIndex = Array.from(inputs || []).indexOf(e.target as HTMLInputElement);
      
      if (inputs && currentIndex === inputs.length - 1) {
        onNext?.();
      } else if (inputs && inputs[currentIndex + 1]) {
        inputs[currentIndex + 1].focus();
      }
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onNext?.();
    }} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Gold & Silver</h2>
        <p className="text-gray-600">Enter the value of your gold and silver assets.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gold">Gold Value</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="gold"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.gold || ''}
              onChange={(e) => onUpdate({ ...data, gold: parseFloat(e.target.value) || 0 })}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="silver">Silver Value</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="silver"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.silver || ''}
              onChange={(e) => onUpdate({ ...data, silver: parseFloat(e.target.value) || 0 })}
              onKeyDown={handleKeyDown}
            />
          </div>
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
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-zakah-light rounded-lg">
        <p className="text-sm text-gray-600">
          Zakah is due on gold and silver if the value meets the nisab threshold and has been held for one lunar year.
        </p>
      </div>
    </form>
  );
};

export default GoldSilverForm;