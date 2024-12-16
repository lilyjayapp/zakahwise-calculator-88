import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BusinessFormProps {
  data: {
    inventory: number;
    rawMaterials: number;
    receivables: number;
    cash: number;
    holdingPeriod: number;
  };
  onUpdate: (data: {
    inventory: number;
    rawMaterials: number;
    receivables: number;
    cash: number;
    holdingPeriod: number;
  }) => void;
}

const BusinessForm = ({ data, onUpdate }: BusinessFormProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-zakah-primary mb-2">Business Assets</h2>
        <p className="text-gray-600">Enter the value of your business assets.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="inventory">Inventory Value</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="inventory"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.inventory || ''}
              onChange={(e) => onUpdate({ ...data, inventory: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="rawMaterials">Raw Materials Value</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="rawMaterials"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.rawMaterials || ''}
              onChange={(e) => onUpdate({ ...data, rawMaterials: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="receivables">Accounts Receivable</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="receivables"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.receivables || ''}
              onChange={(e) => onUpdate({ ...data, receivables: parseFloat(e.target.value) || 0 })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cash">Business Cash</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="cash"
              type="number"
              placeholder="0.00"
              className="pl-8 h-11 text-lg font-bold border-black border-[1px]"
              value={data.cash || ''}
              onChange={(e) => onUpdate({ ...data, cash: parseFloat(e.target.value) || 0 })}
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
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-zakah-light rounded-lg">
        <p className="text-sm text-gray-600">
          Business assets held for trading purposes are subject to Zakah. Fixed assets used in business operations are generally exempt.
        </p>
      </div>
    </div>
  );
};

export default BusinessForm;