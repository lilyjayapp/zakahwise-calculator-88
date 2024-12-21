import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
        <div className="flex gap-4 items-end">
          <div className="flex-1 space-y-1">
            <Label htmlFor="rentalProperties" className="text-sm">Value of Investment Properties</Label>
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
          
          <div className="space-y-1 min-w-[200px]">
            <Label className="text-sm">Property Purpose</Label>
            <ToggleGroup 
              type="single" 
              className="border border-black rounded-md"
              value={data.rentalIncome > 0 ? "rental" : "selling"}
              onValueChange={(value) => {
                if (value === "rental" && data.rentalIncome === 0) {
                  onUpdate({ ...data, rentalIncome: 0 });
                } else if (value === "selling") {
                  onUpdate({ ...data, rentalIncome: 0 });
                }
              }}
            >
              <ToggleGroupItem 
                value="selling" 
                className="flex-1 data-[state=on]:bg-zakah-primary data-[state=on]:text-white"
              >
                For Selling
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="rental" 
                className="flex-1 data-[state=on]:bg-green-500 data-[state=on]:text-white"
              >
                For Rental
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-2 py-2 bg-gray-50 p-3 rounded-lg border border-black border-2 hover:border-zakah-primary transition-all duration-300">
          <div className="flex flex-col">
            <Label htmlFor="personalResidence" className="text-sm font-semibold mb-1">
              Is this property your primary residence?
            </Label>
            <p className="text-xs text-gray-600">
              {data.personalResidence ? 'This is my home' : 'This is not my primary home'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-600">No</span>
            <Switch
              id="personalResidence"
              checked={data.personalResidence}
              onCheckedChange={(checked) => onUpdate({ ...data, personalResidence: checked })}
              className="border-2 border-black rounded-full data-[state=checked]:bg-zakah-primary [&>span]:bg-black"
            />
            <span className="text-xs font-medium text-gray-600">Yes</span>
          </div>
        </div>

        {data.rentalIncome !== undefined && (
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
        )}

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
