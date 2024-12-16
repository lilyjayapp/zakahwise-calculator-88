import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface PropertyFormProps {
  data: {
    rentalProperties: number;
    personalResidence: boolean;
    rentalIncome: number;
    holdingPeriod: number;
  };
  onUpdate: (data: {
    rentalProperties: number;
    personalResidence: boolean;
    rentalIncome: number;
    holdingPeriod: number;
  }) => void;
}

const PropertyForm = ({ data, onUpdate }: PropertyFormProps) => {
  return (
    <div className="space-y-3">
      <div className="text-center mb-3">
        <h2 className="text-lg font-semibold text-zakah-primary">Property Details</h2>
        <p className="text-xs text-gray-600">Enter information about your properties and rental income.</p>
      </div>

      <div className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="rentalProperties" className="text-sm">Value of Rental Properties</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="rentalProperties"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.rentalProperties || ''}
              onChange={(e) => onUpdate({ ...data, rentalProperties: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2 p-4 bg-gray-50 rounded-lg border-2 border-black">
          <Label className="text-sm font-semibold">Primary Residence Status</Label>
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              className={`w-full py-2 border-2 border-black ${
                data.personalResidence 
                ? 'bg-zakah-light text-zakah-primary' 
                : 'bg-white'
              }`}
              onClick={() => onUpdate({ ...data, personalResidence: !data.personalResidence })}
            >
              {data.personalResidence ? 'This is my primary home' : 'This is not my primary home'}
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="rentalIncome" className="text-sm">Monthly Rental Income</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="rentalIncome"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.rentalIncome || ''}
              onChange={(e) => onUpdate({ ...data, rentalIncome: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-1">
          <Label htmlFor="holdingPeriod" className="text-sm">Holding Period (months)</Label>
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

      <div className="mt-2 p-2 bg-zakah-light rounded-lg">
        <p className="text-xs text-gray-600">
          Personal residences are generally exempt from Zakah. Rental properties and their income are subject to Zakah if held for more than one lunar year.
        </p>
      </div>
    </div>
  );
};

export default PropertyForm;