import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AgricultureFormProps {
  data: {
    type: string;
    value: number;
    expenses: number;
  };
  onUpdate: (data: {
    type: string;
    value: number;
    expenses: number;
  }) => void;
  onNext?: () => void;
}

const AgricultureForm = ({ data, onUpdate, onNext }: AgricultureFormProps) => {
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
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Agricultural Produce</h2>
        <p className="text-gray-600">Enter details about your agricultural produce and irrigation method.</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4 border border-black rounded-lg p-4">
          <Label>Irrigation Method</Label>
          <RadioGroup
            value={data.type}
            onValueChange={(value) => onUpdate({ ...data, type: value })}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="natural" id="natural" />
              <Label htmlFor="natural">Natural (Rain/Rivers) - 10% Rate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="irrigated" id="irrigated" />
              <Label htmlFor="irrigated">Artificial Irrigation - 5% Rate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="mixed" id="mixed" />
              <Label htmlFor="mixed">Mixed Method - 7.5% Rate</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="value">Total Value of Produce</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="value"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.value || ''}
              onChange={(e) => onUpdate({ ...data, value: parseFloat(e.target.value) || 0 })}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expenses">Irrigation/Farming Expenses</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="expenses"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.expenses || ''}
              onChange={(e) => onUpdate({ ...data, expenses: parseFloat(e.target.value) || 0 })}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-zakah-light rounded-lg">
        <p className="text-sm text-gray-600">
          Zakah rates for agricultural produce vary based on the irrigation method: 10% for natural irrigation, 5% for artificial irrigation, and 7.5% for mixed methods.
        </p>
      </div>
    </form>
  );
};

export default AgricultureForm;