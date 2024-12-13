import React from 'react';
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SummaryCardProps {
  title: string;
  items: Array<{ label: string; value: number | string }>;
  total?: { label: string; value: number; className?: string };
}

const SummaryCard = ({ title, items, total }: SummaryCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="p-6 bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">
              {typeof item.value === 'number' ? formatCurrency(item.value) : item.value}
            </span>
          </div>
        ))}
        
        {total && (
          <>
            <Separator className="my-4" />
            <div className={`flex justify-between font-semibold ${total.className || ''}`}>
              <span>{total.label}</span>
              <span>{formatCurrency(total.value)}</span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default SummaryCard;