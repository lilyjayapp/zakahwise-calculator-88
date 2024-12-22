import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface PropertyFormProps {
  data: {
    rentalProperties: number;
    personalResidence: boolean;
    rentalIncome: number;
    holdingPeriod: number;
    isForRental: boolean;
  };
  onUpdate: (data: {
    rentalProperties: number;
    personalResidence: boolean;
    rentalIncome: number;
    holdingPeriod: number;
    isForRental: boolean;
  }) => void;
  onNext?: () => void;
}

const PropertyForm = ({ data, onUpdate, onNext }: PropertyFormProps) => {
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

  // Helper function to format currency
  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onNext?.();
    }} className="space-y-2">
      <div className="text-center mb-2">
        <h2 className="text-lg font-semibold text-zakah-primary">Property Details</h2>
        <p className="text-xs text-gray-600">Enter information about your properties and rental income.</p>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 items-end">
          <div className="flex-1 space-y-1">
            <Label htmlFor="rentalProperties" className="text-sm">
              Value of Investment Properties
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="rentalProperties"
                type="number"
                placeholder="0.00"
                className="pl-8 h-9 text-base font-bold border-black border-[1px]"
                value={data.rentalProperties || ''}
                onChange={(e) => onUpdate({ ...data, rentalProperties: parseFloat(e.target.value) || 0 })}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2 py-2 px-3 bg-zakah-light rounded-lg border-2 border-black hover:border-zakah-primary transition-all duration-300">
          <div className="flex flex-col">
            <Label className="text-sm font-semibold">Property Purpose</Label>
            <p className="text-xs text-gray-600">
              {data.isForRental ? 'Property is held for rental income' : 'Property is held for selling'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-800">For Selling</span>
            <Switch
              checked={data.isForRental}
              onCheckedChange={(checked) => onUpdate({ 
                ...data, 
                isForRental: checked,
                rentalIncome: checked ? data.rentalIncome : 0 
              })}
              className="border-2 border-black rounded-full data-[state=checked]:bg-black [&>span]:bg-white [&>span]:border-2 [&>span]:border-black"
            />
            <span className="text-xs font-bold text-gray-800">For Rental</span>
          </div>
        </div>

        {data.isForRental && (
          <div className="space-y-1 animate-in fade-in-50 duration-300">
            <Label htmlFor="rentalIncome" className="text-sm">Monthly Rental Income</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="rentalIncome"
                type="number"
                placeholder="0.00"
                className="pl-8 h-9 text-base font-bold border-black border-[1px]"
                value={data.rentalIncome || ''}
                onChange={(e) => onUpdate({ ...data, rentalIncome: parseFloat(e.target.value) || 0 })}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between space-x-2 py-2 bg-gray-50 p-2 rounded-lg border-2 border-black hover:border-zakah-primary transition-all duration-300">
          <div className="flex flex-col">
            <Label htmlFor="personalResidence" className="text-sm font-semibold">
              Is this property your primary residence?
            </Label>
            <p className="text-xs text-gray-600">
              {data.personalResidence ? 'This is my home' : `This is not your primary home (${formatCurrency(data.rentalProperties)})`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-800">No</span>
            <Switch
              id="personalResidence"
              checked={data.personalResidence}
              onCheckedChange={(checked) => onUpdate({ ...data, personalResidence: checked })}
              className="border-2 border-black rounded-full data-[state=unchecked]:bg-black [&>span]:bg-white [&>span]:border-2 [&>span]:border-black"
            />
            <span className="text-xs font-bold text-gray-800">Yes</span>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="holdingPeriod" className="text-sm">Holding Period (months)</Label>
          <Input
            id="holdingPeriod"
            type="number"
            placeholder="12"
            className="h-9 text-base font-bold border-black border-[1px]"
            value={data.holdingPeriod || ''}
            onChange={(e) => onUpdate({ ...data, holdingPeriod: parseFloat(e.target.value) || 0 })}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      <div className="mt-2 p-2 bg-zakah-light rounded-lg">
        <p className="text-xs text-gray-600">
          Personal residences are generally exempt from Zakah. Properties held for selling are subject to Zakah on their full value, while rental properties are subject to Zakah on the rental income if held for more than one lunar year.
        </p>
      </div>
    </form>
  );
};

export default PropertyForm;